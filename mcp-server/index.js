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
# Slidedown 2.0 Markdown Syntax Reference

## HOW SLIDEDOWN WORKS
Slidedown turns markdown into interactive slide presentations. Each slide can have:
1. **Content** - Headings, text, lists, code, images, math
2. **Background** - Colors, gradients, or images with opacity
3. **Fragments** - Content that reveals incrementally on arrow/space key presses

**Fragment Behavior:** Fragments create progressive disclosure. When viewing a slide:
- First view: Only non-fragment content is visible
- Press → or Space: Next fragment reveals (fades/slides/grows into view)
- Press → again: Next fragment reveals, and so on
- All fragments on a slide must be revealed before moving to the next slide

## TYPICAL WORKFLOW (AI ↔ USER)
1. **User** requests a presentation topic
2. **AI** (you) generates markdown using new syntax
3. **AI** uses write_markdown tool to save the file
4. **AI** uses serve tool to start preview server
5. **User** reviews in browser, suggests changes
6. **AI** uses read_markdown to see current content
7. **AI** modifies and uses write_markdown to update
8. **User** sees changes automatically (hot reload)
9. Repeat until satisfied, then use build tool for production

## Slide Separators
- \`---\` creates a new horizontal slide
- \`--\` creates a vertical slide (nested under the current horizontal slide)

## New Markdown-Native Syntax (2.0)

### Slide Directives with \`:::\`
Set slide properties without HTML comments:

\`\`\`markdown
::: #667eea
## Purple Background Slide

::: https://example.com/image.jpg
::: opacity:0.3
## Image Background with 30% Opacity

::: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
## Gradient Background
\`\`\`

**Supported directives:**
- \`::: #color\` - Hex colors (#667eea)
- \`::: rgb(...)\` - RGB colors
- \`::: hsl(...)\` - HSL colors
- \`::: http://...\` or \`::: /path/to/image\` - Background images
- \`::: linear-gradient(...)\` - Gradients
- \`::: opacity:0.5\` - Background opacity (0.0-1.0, for images)

### Symbol-Based Fragment Animations
Use intuitive symbols instead of HTML comments:

\`\`\`markdown
- ^^^ Fades up from bottom
- vvv Fades down from top
- ---> Slides in from right
- <--- Slides in from left
- +++ Grows larger
- ... Shrinks smaller
- ~~~ Strikes through
- >>red Highlights in red
- >>green Highlights in green
- >>blue Highlights in blue
- >> Basic fade in
\`\`\`

### Inline Fragments
Wrap text with matching symbols:

\`\`\`markdown
This sentence has +++emphasized text+++ and ^^^fading text^^^.
\`\`\`

## Old HTML Comment Syntax (Still Supported)

### Slide Attributes
\`\`\`markdown
<!-- .slide: data-background="#ff0000" -->
## Red Background Slide
\`\`\`

Common attributes:
- \`data-background="#color"\` - background color
- \`data-background-image="url"\` - background image
- \`data-background-opacity="0.5"\` - background opacity

### Element Attributes
\`\`\`markdown
- Item 1 <!-- .element: class="fragment" -->
- Item 2 <!-- .element: class="fragment fade-up" -->
\`\`\`

Fragment classes: fade-in, fade-out, fade-up, fade-down, fade-left, fade-right,
grow, shrink, strike, highlight-red, highlight-green, highlight-blue

## Code Blocks
Standard markdown fenced code blocks with syntax highlighting (100+ languages):

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Math Support
Inline: \`$E = mc^2$\`

Block equations:
\`\`\`
$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
\`\`\`

## Images & Media
\`![Alt text](path/to/image.png)\`

Images can be:
- Local files: \`images/photo.png\`
- URLs: \`https://example.com/image.jpg\`
- Embedded in slides or as backgrounds

## Tables
GitHub-flavored markdown tables:
\`\`\`
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
\`\`\`

## Definition Lists
\`\`\`
React
: A JavaScript library for UIs
: Developed by Meta

Vue
: Progressive JavaScript framework
\`\`\`

## Company Branding
To add a logo to all slides, create a config file (see \`create_config\` tool).

---

## COMPLETE EXAMPLES FOR AI GENERATION

### Example 1: Title Slide
\`\`\`markdown
# Product Launch 2026

## Introducing Our Revolutionary Platform

**January 15, 2026**

By Sarah Chen, Product Director
\`\`\`

### Example 2: Slide with Background + Fragments
\`\`\`markdown
::: #667eea

## Key Features

Our platform delivers:

- >> Security first architecture
- ^^^ Cloud-native scalability
- vvv Real-time collaboration
- ---> AI-powered insights
- +++ 99.99% uptime SLA
\`\`\`
**How this works:** Purple background. Each bullet appears one at a time when user presses →

### Example 3: Image Background with Code
\`\`\`markdown
::: https://images.unsplash.com/photo-1517694712202-14dd9538aa97
::: opacity:0.25

## Tech Stack

Built with modern technologies:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}
\`\`\`

- ^^^ TypeScript for type safety
- vvv React for UI
- ---> Node.js backend
\`\`\`
**How this works:** Tech-themed background at 25% opacity. Code block always visible, bullets reveal incrementally.

### Example 4: Data Slide with Table + Math
\`\`\`markdown
## Performance Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Load Time | 3.2s | 0.8s | ^^^ **75%** |
| Memory | 450MB | 180MB | vvv **60%** |
| CPU | 85% | 35% | ---> **59%** |

Cost savings formula:

$$
\\text{Savings} = \\frac{\\text{Old Cost} - \\text{New Cost}}{\\text{Old Cost}} \\times 100\\%
$$
\`\`\`
**How this works:** Table rows can have fragments. Math equation always visible.

### Example 5: Vertical Slides (Nested Content)
\`\`\`markdown
## Roadmap Overview

Press ↓ to explore each quarter

--

### Q1 2026

- ^^^ Feature A launch
- vvv Feature B beta
- ---> Platform v2.0

--

### Q2 2026

- <--- Mobile apps
- +++ Enterprise tier
- ... Legacy migration complete
\`\`\`
**How this works:** First slide is overview. Press ↓ to go to Q1 details, ↓ again for Q2. Press → to move to next topic.

### Example 6: Call-to-Action Slide
\`\`\`markdown
::: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

# +++Ready to Get Started?+++

## Join 10,000+ companies already using our platform

- >> Try free for 30 days
- ^^^ No credit card required
- vvv Cancel anytime

**Visit:** +++app.example.com+++ ^^^

Questions? →→→ hello@example.com ^^^
\`\`\`
**How this works:** Gradient background. Title grows on entry. Everything else reveals progressively.

---

## BEST PRACTICES FOR AI-GENERATED PRESENTATIONS

1. **Ask user about:**
   - Target audience (technical? executives? general?)
   - Presentation length (5, 10, 20 slides?)
   - Tone (formal? casual? fun?)
   - Branding (colors? logo?)

2. **Structure pattern:**
   \`\`\`
   Title Slide
   ---
   Agenda/Overview
   ---
   [Content Slides with topics]
   ---
   Conclusion/Call-to-Action
   ---
   Thank You / Questions
   \`\`\`

3. **Fragment usage:**
   - Use fragments for key points that build on each other
   - Don't fragment everything (overwhelming)
   - 3-5 fragments per slide is ideal
   - Always visible: titles, important context, images

4. **Background usage:**
   - Dark colors (#1a1a1a, #667eea) for tech/professional
   - Light gradients for creative/marketing
   - Images with opacity:0.2-0.4 for visual interest without overwhelming text
   - Consistent background style = professional look

5. **Combining features:**
   \`\`\`markdown
   ::: linear-gradient(to right, #667eea, #764ba2)

   ## AI in Healthcare

   Market size: $10.4B +++

   - ^^^ Diagnostic accuracy: 95%
   - vvv Treatment time: -40%
   - ---> Patient satisfaction: +60%

   \`\`\`javascript
   // AI model prediction
   const diagnosis = await ai.predict(patientData);
   \`\`\`

   Key insight: +++AI reduces errors by 78%+++ ^^^
   \`\`\`

## COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Mix old (HTML comments) and new syntax in same presentation
- Put fragments on slide titles (they should always be visible)
- Use image backgrounds without opacity (text becomes unreadable)
- Create 50-slide presentations (aim for 10-15 focused slides)

✅ **DO:**
- Use new ::: and ^^^ syntax (cleaner, more readable)
- Test the presentation (use serve tool) before final delivery
- Ask user to review and iterate based on feedback
- Use fragments sparingly for impact
- Match background colors to user's brand (if they provide)

## WORKFLOW SUMMARY

When user asks for a presentation:
1. **Clarify:** Ask about topic, audience, length, style
2. **Generate:** Create markdown using new syntax
3. **Save:** Use write_markdown tool
4. **Preview:** Use serve tool (gives user URL to view)
5. **Iterate:** User reviews → you read_markdown → you modify → write_markdown (auto-reloads)
6. **Deploy:** When approved, use build tool for production files

This workflow creates a collaborative experience where you and the user refine the presentation together!
`;

const server = new Server(
	{
		name: 'slidedown-mcp',
		version: '2.0.0',
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
				description: 'Read a markdown presentation file and return its contents along with Slidedown 2.0 syntax documentation.',
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
				name: 'write_markdown',
				description: 'Write or update a markdown presentation file. Creates the file if it doesn\'t exist.',
				inputSchema: {
					type: 'object',
					properties: {
						path: {
							type: 'string',
							description: 'Path where to save the markdown file',
						},
						content: {
							type: 'string',
							description: 'Markdown content for the presentation',
						},
					},
					required: ['path', 'content'],
				},
			},
			{
				name: 'create_presentation',
				description: 'Create a new Slidedown 2.0 presentation with a starter template. Includes sample slides with the new syntax.',
				inputSchema: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							description: 'Name for the presentation (e.g., "my-presentation")',
						},
						title: {
							type: 'string',
							description: 'Title for the presentation',
							default: 'My Presentation',
						},
					},
					required: ['name'],
				},
			},
			{
				name: 'serve',
				description: 'Start the Slidedown 2.0 development server with live preview. Opens at http://localhost:5173',
				inputSchema: {
					type: 'object',
					properties: {
						markdown_file: {
							type: 'string',
							description: 'Optional: specific markdown file to load (filename without .md extension)',
						},
					},
				},
			},
			{
				name: 'build',
				description: 'Build the presentation for production deployment. Creates optimized static files.',
				inputSchema: {
					type: 'object',
					properties: {},
				},
			},
			{
				name: 'create_config',
				description: 'Create a slidedown.config.json file for presentation settings (theme, logo, defaults, etc.)',
				inputSchema: {
					type: 'object',
					properties: {
						logo_path: {
							type: 'string',
							description: 'Path to company logo image',
						},
						logo_position: {
							type: 'string',
							description: 'Logo position: top-left, top-right, bottom-left, bottom-right',
							default: 'bottom-right',
						},
						default_background: {
							type: 'string',
							description: 'Default background color for all slides',
						},
						theme_colors: {
							type: 'object',
							description: 'Custom theme colors (primary, secondary, accent)',
						},
					},
				},
			},
			{
				name: 'get_syntax_help',
				description: 'Get comprehensive Slidedown 2.0 syntax reference and examples.',
				inputSchema: {
					type: 'object',
					properties: {
						topic: {
							type: 'string',
							description: 'Specific topic: fragments, backgrounds, math, tables, all',
							default: 'all',
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

		case 'write_markdown': {
			try {
				let filePath = args.path;
				if (!path.isAbsolute(filePath)) {
					filePath = path.resolve(ROOT_DIR, filePath);
				}

				// Create directory if needed
				await fs.mkdir(path.dirname(filePath), { recursive: true });

				await fs.writeFile(filePath, args.content, 'utf-8');

				return {
					content: [
						{
							type: 'text',
							text: `Markdown file saved successfully to: ${filePath}\n\nTo preview:\n1. Run the serve tool\n2. Navigate to http://localhost:5173?test=${path.basename(filePath, '.md')}`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error writing file: ${error.message}`,
						},
					],
					isError: true,
				};
			}
		}

		case 'create_presentation': {
			try {
				const { name: presName, title = 'My Presentation' } = args;
				const outputPath = path.resolve(ROOT_DIR, 'app', 'src', 'test-content', `${presName}.md`);

				const starterContent = `# ${title}

Welcome to your presentation!

---

::: #667eea

## Beautiful Backgrounds

Use the new \`:::\` syntax for clean, markdown-native slides.

- ^^^ No HTML comments needed
- vvv Intuitive symbols
- ---> Easy to read and write

---

## Fragment Animations

Watch content reveal step by step:

- >> First item appears
- ^^^ Second item fades up
- +++ Third item grows
- >>green Fourth item highlights

---

::: https://images.unsplash.com/photo-1506905925346-21bda4d32df4
::: opacity:0.3

## Image Backgrounds

Background images with adjustable opacity for readability.

\`\`\`javascript
// Code blocks work great too!
console.log("Hello, World!");
\`\`\`

---

## Math Support

Inline equations: $E = mc^2$

Block equations:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

---

## What's Next?

Edit this file and see your changes live!

- Use ^^^ symbols for animations
- Try vvv different effects
- Add ---> more slides
- Customize <--- with \`:::\` directives

---

# Thank You! +++

Questions? ^^^
`;

				await fs.mkdir(path.dirname(outputPath), { recursive: true });
				await fs.writeFile(outputPath, starterContent, 'utf-8');

				return {
					content: [
						{
							type: 'text',
							text: `Presentation created successfully!\n\nFile: ${outputPath}\n\nTo view:\n1. Run the serve tool\n2. Open: http://localhost:5173?test=${presName}\n\nThe starter template includes:\n- New ::: syntax examples\n- Symbol-based fragment animations\n- Background images with opacity\n- Math equations\n- Code highlighting`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error creating presentation: ${error.message}`,
						},
					],
					isError: true,
				};
			}
		}

		case 'serve': {
			try {
				const appDir = path.resolve(ROOT_DIR, 'app');

				// Start the Vite dev server
				const serverProcess = spawn('npm', ['run', 'dev'], {
					cwd: appDir,
					detached: false,
					stdio: 'inherit',
				});

				const url = args.markdown_file
					? `http://localhost:5173?test=${args.markdown_file}`
					: `http://localhost:5173?test=new-syntax-demo`;

				return {
					content: [
						{
							type: 'text',
							text: `Slidedown 2.0 development server starting...\n\nURL: ${url}\n\nThe server will open in your browser automatically.\nPress Ctrl+C to stop the server.`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error starting server: ${error.message}\n\nMake sure dependencies are installed:\ncd app && npm install`,
						},
					],
					isError: true,
				};
			}
		}

		case 'build': {
			try {
				const appDir = path.resolve(ROOT_DIR, 'app');

				return new Promise((resolve) => {
					const buildProcess = spawn('npm', ['run', 'build'], {
						cwd: appDir,
						stdio: 'pipe',
					});

					let output = '';
					buildProcess.stdout.on('data', (data) => {
						output += data.toString();
					});

					buildProcess.stderr.on('data', (data) => {
						output += data.toString();
					});

					buildProcess.on('close', (code) => {
						if (code === 0) {
							resolve({
								content: [
									{
										type: 'text',
										text: `Build successful!\n\nOutput directory: ${path.join(appDir, 'dist')}\n\nDeploy the contents of this directory to your web server.`,
									},
								],
							});
						} else {
							resolve({
								content: [
									{
										type: 'text',
										text: `Build failed with code ${code}\n\nOutput:\n${output}`,
									},
								],
								isError: true,
							});
						}
					});
				});
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

		case 'create_config': {
			try {
				const configPath = path.resolve(ROOT_DIR, 'app', 'slidedown.config.json');

				const config = {
					version: '2.0',
					branding: {
						logo: args.logo_path || null,
						logoPosition: args.logo_position || 'bottom-right',
						logoSize: '80px',
					},
					defaults: {
						background: args.default_background || null,
						transition: 'slide',
						fragmentAnimation: 'fade-in',
					},
					theme: {
						colors: args.theme_colors || {
							primary: '#667eea',
							secondary: '#764ba2',
							accent: '#4299e1',
						},
						fonts: {
							heading: 'system-ui, sans-serif',
							body: 'system-ui, sans-serif',
							code: 'monospace',
						},
					},
					features: {
						fragments: true,
						math: true,
						syntaxHighlighting: true,
						tableOfContents: true,
						mouseWheelNavigation: true,
					},
				};

				await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

				return {
					content: [
						{
							type: 'text',
							text: `Configuration file created: ${configPath}\n\n${JSON.stringify(config, null, 2)}\n\nTo add a company logo:\n1. Place your logo image in app/public/logo.png\n2. Update the config: "logo": "/logo.png"\n3. Restart the dev server\n\nThe logo will appear on all slides at the position specified.`,
						},
					],
				};
			} catch (error) {
				return {
					content: [
						{
							type: 'text',
							text: `Error creating config: ${error.message}`,
						},
					],
					isError: true,
				};
			}
		}

		case 'get_syntax_help': {
			const topic = args.topic || 'all';
			let helpText = '';

			if (topic === 'all' || topic === 'fragments') {
				helpText += `
## Fragment Animations

Symbol-based syntax (NEW):
- ^^^ - Fade up from bottom
- vvv - Fade down from top
- ---> - Slide in from right
- <--- - Slide in from left
- +++ - Grow larger
- ... - Shrink smaller
- ~~~ - Strike through
- >>red, >>green, >>blue - Color highlights
- >> - Basic fade in

Inline fragments:
+++text+++ ^^^text^^^ vvvtextvvv

Old syntax (still works):
<!-- .element: class="fragment fade-up" -->
`;
			}

			if (topic === 'all' || topic === 'backgrounds') {
				helpText += `
## Backgrounds

New ::: syntax:
::: #667eea           - Hex color
::: rgb(100,126,234)  - RGB color
::: hsl(230,75%,65%)  - HSL color
::: linear-gradient(...) - Gradient
::: https://... - Image URL
::: opacity:0.3 - Image opacity (0.0-1.0)

Old syntax:
<!-- .slide: data-background="#667eea" -->
<!-- .slide: data-background-image="url" data-background-opacity="0.3" -->
`;
			}

			if (topic === 'all' || topic === 'math') {
				helpText += `
## Math Equations

Inline: $E = mc^2$

Block:
$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

Full LaTeX support via KaTeX.
`;
			}

			if (topic === 'all' || topic === 'tables') {
				helpText += `
## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Data A   | Data B   | Data C   |

GitHub Flavored Markdown tables are fully supported.
`;
			}

			return {
				content: [
					{
						type: 'text',
						text: helpText || SLIDEDOWN_SYNTAX_DOCS,
					},
				],
			};
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
	console.error('Slidedown 2.0 MCP server running on stdio');
}

main().catch(console.error);
