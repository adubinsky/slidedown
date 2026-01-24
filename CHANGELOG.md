# Changelog

All notable changes to Slidedown will be documented in this file.

## [1.0.0] - 2025-01-24

### Added

- **Markdown-first workflow**: Presentations are now created from Markdown files in `input/` directory, rather than HTML-first approach
- **Folder structure**: Added `input/` for presentation sources and `output/` for generated presentations
- **MCP server**: Added Model Context Protocol server (`mcp-server/`) for AI-assisted slide creation with three tools:
  - `read_markdown` - Read files with syntax documentation
  - `build_presentation` - Generate HTML from Markdown
  - `serve` - Start development server
- **Setup script**: Added `setup.sh` for easy installation
- **Example presentation**: Added `input/example/slides.md` demonstrating all slide features

### Changed

- Renamed project from reveal.js to Slidedown
- Updated README with Slidedown documentation and quick start guide
- Updated CONTRIBUTING.md with Slidedown conventions

### Based On

- Forked from [reveal.js](https://github.com/hakimel/reveal.js) v5.2.1
- All reveal.js features remain available (nested slides, code highlighting, speaker notes, PDF export, themes, plugins, etc.)

---

## Attribution

Slidedown is built on [reveal.js](https://revealjs.com) by [Hakim El Hattab](https://hakim.se).

For reveal.js changelog prior to this fork, see the [reveal.js releases](https://github.com/hakimel/reveal.js/releases).
