#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SLIDEDOWN_SYNTAX_DOCS = `
# Slidedown Markdown Syntax Reference

## Slide Separators
- \`---\` creates a new horizontal slide
- \`--\` creates a vertical slide (nested under the current horizontal slide)

## Speaker Notes
Add speaker notes with \`Note:\` at the end of a slide:
\`\`\`
## My Slide

Content here

Note: These notes only appear in speaker view (press 'S')
\`\`\`

## Slide Attributes
Use HTML comments to set slide-level attributes:
\`\`\`
<!-- .slide: data-background="#ff0000" -->
## Red Background Slide
\`\`\`

Common attributes:
- \`data-background="#color"\` - background color
- \`data-background-image="url"\` - background image
- \`data-background-opacity="0.5"\` - background opacity
- \`data-transition="slide|fade|convex|concave|zoom"\` - slide transition

## Element Attributes
Add attributes to specific elements:
\`\`\`
- Item 1 <!-- .element: class="fragment" -->
- Item 2 <!-- .element: class="fragment fade-up" -->
\`\`\`

## Fragments (Incremental Reveal)
Fragment classes: fade-in, fade-out, fade-up, fade-down, fade-left, fade-right,
grow, shrink, strike, highlight-red, highlight-green, highlight-blue

## Code Blocks
Standard markdown fenced code blocks with syntax highlighting:
\`\`\`javascript
const x = 1;
\`\`\`

## Images
\`![Alt text](images/photo.png)\`

Images should be placed in the \`images/\` subdirectory next to your slides.md
`;

const server = new Server(
	{
		name: 'slidedown-mcp',
		version: '1.0.0',
	},
	{
		capabilities: {
			tools: {},
		},
	}
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: 'read_markdown',
				description: 'Read a markdown file and return its contents along with Slidedown syntax documentation. Use this to understand existing content before editing or to learn the slide syntax.',
				inputSchema: {
					type: 'object',
					properties: {
						path: {
							type: 'string',
							description: 'Path to the markdown file (relative to slidedown root or absolute)',
						},
					},
					required: ['path'],
				},
			},
			{
				name: 'build_presentation',
				description: 'Build a complete HTML presentation from a markdown file. Copies the necessary template and assets to the output directory.',
				inputSchema: {
					type: 'object',
					properties: {
						markdown_path: {
							type: 'string',
							description: 'Path to the source markdown file (e.g., input/example/slides.md)',
						},
						output_name: {
							type: 'string',
							description: 'Name for the output presentation (e.g., "my-presentation")',
						},
						theme: {
							type: 'string',
							description: 'Theme to use (default: "black"). Options: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon, dracula',
							default: 'black',
						},
					},
					required: ['markdown_path', 'output_name'],
				},
			},
			{
				name: 'serve',
				description: 'Start a development server to preview presentations. Opens the presentation in a browser.',
				inputSchema: {
					type: 'object',
					properties: {
						port: {
							type: 'number',
							description: 'Port to run the server on (default: 8000)',
							default: 8000,
						},
					},
				},
			},
		],
	};
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
	const { name, arguments: args } = request.params;

	switch (name) {
		case 'read_markdown': {
			try {
				let filePath = args.path;
				if (!path.isAbsolute(filePath)) {
					filePath = path.resolve(ROOT_DIR, filePath);
				}

				const content = await fs.readFile(filePath, 'utf-8');

				return {
					content: [
						{
							type: 'text',
							text: `# File: ${args.path}\n\n## Contents:\n\n${content}\n\n---\n${SLIDEDOWN_SYNTAX_DOCS}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error reading file: ${error.message}\n\n---\n${SLIDEDOWN_SYNTAX_DOCS}`,
						},
					],
					isError: true,
				};
			}
		}

		case 'build_presentation': {
			try {
				const { markdown_path, output_name, theme = 'black' } = args;

				// Resolve paths
				const srcMarkdownPath = path.isAbsolute(markdown_path)
					? markdown_path
					: path.resolve(ROOT_DIR, markdown_path);

				const outputDir = path.resolve(ROOT_DIR, 'output', output_name);
				const srcDir = path.dirname(srcMarkdownPath);

				// Create output directory
				await fs.mkdir(outputDir, { recursive: true });

				// Copy markdown file
				const markdownContent = await fs.readFile(srcMarkdownPath, 'utf-8');
				await fs.writeFile(path.join(outputDir, 'slides.md'), markdownContent);

				// Copy images if they exist
				const imagesDir = path.join(srcDir, 'images');
				try {
					const images = await fs.readdir(imagesDir);
					if (images.length > 0) {
						const outputImagesDir = path.join(outputDir, 'images');
						await fs.mkdir(outputImagesDir, { recursive: true });
						for (const image of images) {
							await fs.copyFile(
								path.join(imagesDir, image),
								path.join(outputImagesDir, image)
							);
						}
					}
				} catch {
					// No images directory, that's fine
				}

				// Generate HTML template
				const htmlContent = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<title>${output_name}</title>
		<link rel="stylesheet" href="../dist/reset.css">
		<link rel="stylesheet" href="../dist/reveal.css">
		<link rel="stylesheet" href="../dist/theme/${theme}.css">
		<link rel="stylesheet" href="../plugin/highlight/monokai.css">
	</head>
	<body>
		<div class="reveal">
			<div class="slides">
				<section data-markdown="slides.md"
				         data-separator="^\\r?\\n---\\r?\\n$"
				         data-separator-vertical="^\\r?\\n--\\r?\\n$"
				         data-separator-notes="^Note:">
				</section>
			</div>
		</div>
		<script src="../dist/reveal.js"></script>
		<script src="../plugin/notes/notes.js"></script>
		<script src="../plugin/markdown/markdown.js"></script>
		<script src="../plugin/highlight/highlight.js"></script>
		<script>
			Reveal.initialize({
				hash: true,
				plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
			});
		</script>
	</body>
</html>`;

				await fs.writeFile(path.join(outputDir, 'index.html'), htmlContent);

				// Create symlinks to dist and plugin directories for the presentation to work
				const distLink = path.join(outputDir, 'dist');
				const pluginLink = path.join(outputDir, 'plugin');

				try {
					await fs.unlink(distLink);
				} catch { /* ignore */ }
				try {
					await fs.unlink(pluginLink);
				} catch { /* ignore */ }

				await fs.symlink(path.join(ROOT_DIR, 'dist'), distLink, 'dir');
				await fs.symlink(path.join(ROOT_DIR, 'plugin'), pluginLink, 'dir');

				return {
					content: [
						{
							type: 'text',
							text: `Presentation built successfully!\n\nOutput: ${outputDir}\n\nFiles created:\n- index.html\n- slides.md\n${(await fs.readdir(path.join(outputDir, 'images')).catch(() => [])).length > 0 ? '- images/\n' : ''}\nTo view: Open ${path.join(outputDir, 'index.html')} in a browser or run the serve tool.`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error building presentation: ${error.message}`,
						},
					],
					isError: true,
				};
			}
		}

		case 'serve': {
			try {
				const port = args.port || 8000;

				// Check if gulp is available and use it, otherwise fall back to basic http server
				const gulpPath = path.join(ROOT_DIR, 'node_modules', '.bin', 'gulp');

				let serverProcess;
				let serverInfo;

				try {
					await fs.access(gulpPath);
					// Use gulp serve
					serverProcess = spawn('npm', ['start'], {
						cwd: ROOT_DIR,
						detached: true,
						stdio: 'ignore',
					});
					serverProcess.unref();
					serverInfo = `Development server starting on http://localhost:${port}\n\nUsing gulp serve for live reload support.\nThe server runs in the background. Use Ctrl+C in the terminal to stop it.`;
				} catch {
					// Fall back to basic http server
					serverProcess = spawn('npx', ['http-server', '.', '-p', String(port)], {
						cwd: ROOT_DIR,
						detached: true,
						stdio: 'ignore',
					});
					serverProcess.unref();
					serverInfo = `Development server starting on http://localhost:${port}\n\nUsing http-server. The server runs in the background.`;
				}

				return {
					content: [
						{
							type: 'text',
							text: serverInfo,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error starting server: ${error.message}`,
						},
					],
					isError: true,
				};
			}
		}

		default:
			return {
				content: [
					{
						type: 'text',
						text: `Unknown tool: ${name}`,
					},
				],
				isError: true,
			};
	}
});

// Start the server
async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error('Slidedown MCP server running on stdio');
}

main().catch(console.error);
