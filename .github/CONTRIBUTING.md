## Contributing to Slidedown

Thank you for your interest in contributing to Slidedown!

### Issue Tracker

Please keep the [issue tracker](https://github.com/adubinsky/slidedown/issues) limited to **bug reports** and **feature requests**.

### General Questions and Support

If you have questions about how to use Slidedown, please open a [Discussion](https://github.com/adubinsky/slidedown/discussions) instead of an issue.

### Bug Reports

When reporting a bug, please include:
- Browser and operating system
- Steps to reproduce the issue
- A link to a sample presentation where the bug can be tested (if possible)

### Pull Requests

- Should be submitted from a feature/topic branch (not your master)
- Follow the coding style of the file you're working in:
  - **Tabs** for indentation
  - **Single quotes** for strings
- Keep changes focused - one feature or fix per PR

### Project Structure

```
slidedown/
├── input/          # User presentations (example included)
├── output/         # Generated presentations (gitignored)
├── mcp-server/     # MCP server for AI assistance
├── css/            # Stylesheets and themes (reveal.js)
├── js/             # Core JavaScript (reveal.js)
├── plugin/         # Plugins (reveal.js)
└── dist/           # Built files (reveal.js)
```

### MCP Server Contributions

The MCP server is in `mcp-server/`. When contributing:
- Follow ES module syntax
- Keep tools focused and well-documented
- Update the README if adding new tools

### Reveal.js Core

Slidedown is built with reveal.js. For core presentation engine changes, consider whether they should be contributed upstream to [reveal.js](https://github.com/hakimel/reveal.js) instead.

### Plugins

Plugins should be maintained in separate repositories. See the [reveal.js Plugin Guidelines](https://github.com/hakimel/reveal.js/wiki/Plugin-Guidelines) for more information.
