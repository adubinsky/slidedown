#!/usr/bin/env node

/**
 * Slidedown CLI - Build presentations from markdown
 * Usage: node cli.js build <markdown-path> <output-name> [theme]
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = __dirname;

const THEMES = ['black', 'white', 'league', 'beige', 'sky', 'night', 'serif', 'simple', 'solarized', 'blood', 'moon', 'dracula'];

async function buildPresentation(markdownPath, outputName, theme = 'black') {
	try {
		console.log(`Building presentation: ${outputName}`);
		console.log(`Theme: ${theme}`);

		// Validate theme
		if (!THEMES.includes(theme)) {
			console.error(`Invalid theme: ${theme}`);
			console.error(`Available themes: ${THEMES.join(', ')}`);
			process.exit(1);
		}

		// Resolve paths
		// Markdown path resolves from current working directory
		const srcMarkdownPath = path.isAbsolute(markdownPath)
			? markdownPath
			: path.resolve(process.cwd(), markdownPath);

		// Output always goes to slidedown's output directory
		const outputDir = path.resolve(ROOT_DIR, 'output', outputName);
		const srcDir = path.dirname(srcMarkdownPath);

		// Check if markdown file exists
		try {
			await fs.access(srcMarkdownPath);
		} catch {
			console.error(`Error: Markdown file not found: ${srcMarkdownPath}`);
			process.exit(1);
		}

		// Create output directory
		await fs.mkdir(outputDir, { recursive: true });
		console.log(`Created output directory: ${outputDir}`);

		// Copy markdown file
		const markdownContent = await fs.readFile(srcMarkdownPath, 'utf-8');
		await fs.writeFile(path.join(outputDir, 'slides.md'), markdownContent);
		console.log('Copied slides.md');

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
				console.log(`Copied ${images.length} image(s)`);
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
		<title>${outputName}</title>
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
		console.log('Generated index.html');

		// Create symlinks to dist and plugin directories
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
		console.log('Created symlinks to dist/ and plugin/');

		console.log('\n✅ Presentation built successfully!');
		console.log(`\nOutput directory: ${outputDir}`);
		console.log(`View at: http://localhost:8000/output/${outputName}/`);
		console.log('\nStart server with: npm start');
	} catch (error) {
		console.error(`\n❌ Error building presentation: ${error.message}`);
		process.exit(1);
	}
}

async function validateMarkdown(markdownPath) {
	try {
		const srcPath = path.isAbsolute(markdownPath)
			? markdownPath
			: path.resolve(process.cwd(), markdownPath);

		const content = await fs.readFile(srcPath, 'utf-8');

		console.log('Validating markdown...\n');

		// Count slides
		const horizontalSlides = (content.match(/\n---\n/g) || []).length + 1;
		const verticalSlides = (content.match(/\n--\n/g) || []).length;

		console.log(`📊 Slide count:`);
		console.log(`   Horizontal slides: ${horizontalSlides}`);
		console.log(`   Vertical slides: ${verticalSlides}`);
		console.log(`   Total: ${horizontalSlides + verticalSlides}`);

		// Check for common issues
		const issues = [];

		// Check for triple dashes instead of ---
		if (content.includes('\n***\n')) {
			issues.push('⚠️  Found "***" - should be "---" for horizontal slides');
		}

		// Check for incorrect vertical separator
		if (content.includes('\n##\n')) {
			issues.push('ℹ️  Found "##" on its own line - did you mean "--" for vertical slides?');
		}

		// Check for speaker notes
		const hasNotes = content.includes('Note:');
		console.log(`\n📝 Speaker notes: ${hasNotes ? 'Yes' : 'No'}`);

		// Check for code blocks
		const codeBlocks = (content.match(/```/g) || []).length / 2;
		if (codeBlocks > 0) {
			console.log(`💻 Code blocks: ${codeBlocks}`);
		}

		// Check for images
		const images = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
		if (images > 0) {
			console.log(`🖼️  Images: ${images}`);
		}

		// Check for slide attributes
		const slideAttrs = (content.match(/<!-- \.slide:/g) || []).length;
		if (slideAttrs > 0) {
			console.log(`🎨 Slides with custom attributes: ${slideAttrs}`);
		}

		// Check for fragments
		const fragments = (content.match(/<!-- \.element: class="fragment/g) || []).length;
		if (fragments > 0) {
			console.log(`✨ Fragment elements: ${fragments}`);
		}

		if (issues.length > 0) {
			console.log('\n⚠️  Potential issues found:');
			issues.forEach(issue => console.log(`   ${issue}`));
		} else {
			console.log('\n✅ No issues found!');
		}

		console.log(`\n📄 File: ${srcPath}`);
		console.log(`📦 Size: ${(content.length / 1024).toFixed(2)} KB`);

	} catch (error) {
		console.error(`\n❌ Error validating markdown: ${error.message}`);
		process.exit(1);
	}
}

function showHelp() {
	console.log(`
Slidedown CLI - Build beautiful presentations from markdown

Usage:
  node cli.js build <markdown-path> <output-name> [theme]
  node cli.js validate <markdown-path>
  node cli.js help

Commands:
  build      Build a presentation from markdown
  validate   Validate markdown format and show statistics
  help       Show this help message

Examples:
  node cli.js build input/my-talk/slides.md my-talk
  node cli.js build input/my-talk/slides.md my-talk moon
  node cli.js validate input/my-talk/slides.md

Available themes:
  ${THEMES.join(', ')}

After building, start the server with:
  npm start

Then open: http://localhost:8000/output/<output-name>/
`);
}

// Main CLI logic
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
	case 'build':
		if (args.length < 3) {
			console.error('Error: Missing arguments');
			console.error('Usage: node cli.js build <markdown-path> <output-name> [theme]');
			process.exit(1);
		}
		buildPresentation(args[1], args[2], args[3]);
		break;

	case 'validate':
		if (args.length < 2) {
			console.error('Error: Missing markdown path');
			console.error('Usage: node cli.js validate <markdown-path>');
			process.exit(1);
		}
		validateMarkdown(args[1]);
		break;

	case 'help':
	case '--help':
	case '-h':
		showHelp();
		break;

	default:
		console.error(`Unknown command: ${command}`);
		showHelp();
		process.exit(1);
}
