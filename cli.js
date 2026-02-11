#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = {
	init: {
		description: 'Create a new presentation',
		usage: 'slidedown init <name> [title]',
		action: async (args) => {
			const name = args[0];
			if (!name) {
				console.error('Error: Please provide a presentation name');
				console.log('Usage: slidedown init <name> [title]');
				process.exit(1);
			}

			const title = args.slice(1).join(' ') || name;
			const outputPath = path.join(__dirname, 'app', 'src', 'test-content', `${name}.md`);

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

			try {
				await fs.mkdir(path.dirname(outputPath), { recursive: true });
				await fs.writeFile(outputPath, starterContent, 'utf-8');

				console.log(`✅ Presentation created: ${name}`);
				console.log(`📄 File: ${outputPath}`);
				console.log(`\n🚀 Next steps:`);
				console.log(`   slidedown serve ${name}`);
			} catch (error) {
				console.error(`❌ Error creating presentation: ${error.message}`);
				process.exit(1);
			}
		},
	},

	serve: {
		description: 'Start development server',
		usage: 'slidedown serve [presentation-name]',
		action: async (args) => {
			const appDir = path.join(__dirname, 'app');
			const presentationName = args[0] || 'new-syntax-demo';

			console.log(`🚀 Starting Slidedown development server...`);
			console.log(`📺 Opening: http://localhost:5173?test=${presentationName}`);
			console.log(`\n⌨️  Press Ctrl+C to stop\n`);

			const child = spawn('npm', ['run', 'dev'], {
				cwd: appDir,
				stdio: 'inherit',
				shell: true,
			});

			child.on('error', (error) => {
				console.error(`❌ Error starting server: ${error.message}`);
				console.log('\n💡 Make sure dependencies are installed:');
				console.log('   cd app && npm install');
				process.exit(1);
			});

			process.on('SIGINT', () => {
				console.log('\n👋 Stopping server...');
				child.kill();
				process.exit(0);
			});
		},
	},

	build: {
		description: 'Build for production',
		usage: 'slidedown build',
		action: async () => {
			const appDir = path.join(__dirname, 'app');

			console.log('🔨 Building presentation for production...\n');

			const child = spawn('npm', ['run', 'build'], {
				cwd: appDir,
				stdio: 'inherit',
				shell: true,
			});

			child.on('close', (code) => {
				if (code === 0) {
					console.log('\n✅ Build successful!');
					console.log(`📦 Output: ${path.join(appDir, 'dist')}`);
					console.log('\n🌐 Deploy the dist/ folder to your web server');
				} else {
					console.error(`\n❌ Build failed with code ${code}`);
					process.exit(code);
				}
			});

			child.on('error', (error) => {
				console.error(`❌ Error building: ${error.message}`);
				process.exit(1);
			});
		},
	},

	config: {
		description: 'Create configuration file',
		usage: 'slidedown config [--logo <path>] [--position <pos>]',
		action: async (args) => {
			const configPath = path.join(__dirname, 'app', 'slidedown.config.json');

			// Parse arguments
			const options = {};
			for (let i = 0; i < args.length; i++) {
				if (args[i] === '--logo' && args[i + 1]) {
					options.logo = args[i + 1];
					i++;
				} else if (args[i] === '--position' && args[i + 1]) {
					options.logoPosition = args[i + 1];
					i++;
				} else if (args[i] === '--background' && args[i + 1]) {
					options.defaultBackground = args[i + 1];
					i++;
				}
			}

			const config = {
				version: '2.0',
				branding: {
					logo: options.logo || null,
					logoPosition: options.logoPosition || 'bottom-right',
					logoSize: '80px',
				},
				defaults: {
					background: options.defaultBackground || null,
					transition: 'slide',
					fragmentAnimation: 'fade-in',
				},
				theme: {
					colors: {
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

			try {
				await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

				console.log(`✅ Configuration created: ${configPath}`);
				console.log('\n📝 Config:');
				console.log(JSON.stringify(config, null, 2));
				console.log('\n💡 To add a company logo:');
				console.log('   1. Place logo in app/public/logo.png');
				console.log('   2. Run: slidedown config --logo /logo.png --position bottom-right');
				console.log('   3. Restart dev server');
			} catch (error) {
				console.error(`❌ Error creating config: ${error.message}`);
				process.exit(1);
			}
		},
	},

	help: {
		description: 'Show help',
		usage: 'slidedown help [command]',
		action: (args) => {
			const command = args[0];

			if (command && commands[command]) {
				console.log(`\n${commands[command].description}`);
				console.log(`Usage: ${commands[command].usage}\n`);
			} else {
				console.log('\n📊 Slidedown 2.0 - Modern Markdown Presentations\n');
				console.log('Commands:');
				Object.entries(commands).forEach(([name, cmd]) => {
					console.log(`  ${name.padEnd(12)} ${cmd.description}`);
				});
				console.log('\nUsage: slidedown <command> [options]');
				console.log('Example: slidedown init my-presentation');
				console.log('\nFor more help: slidedown help <command>');
				console.log('Documentation: https://github.com/adubinsky/slidedown\n');
			}
		},
	},
};

async function main() {
	const args = process.argv.slice(2);
	const command = args[0];

	if (!command || command === 'help' || command === '--help' || command === '-h') {
		commands.help.action(args.slice(1));
		return;
	}

	if (commands[command]) {
		await commands[command].action(args.slice(1));
	} else {
		console.error(`❌ Unknown command: ${command}`);
		console.log('Run "slidedown help" for available commands\n');
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(`❌ Error: ${error.message}`);
	process.exit(1);
});
