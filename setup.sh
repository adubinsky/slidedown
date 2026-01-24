#!/bin/bash

# Slidedown Setup Script
# Run: ./setup.sh

set -e

echo "Setting up Slidedown..."
echo ""

# Install main dependencies
echo "Installing dependencies..."
npm install

# Build reveal.js assets
echo "Building assets..."
npm run build

# Install MCP server dependencies
echo "Setting up MCP server..."
cd mcp-server
npm install
cd ..

echo ""
echo "Setup complete!"
echo ""
echo "Quick start:"
echo "  npm start          - Start development server"
echo "  npm run serve      - Same as above"
echo ""
echo "Your presentations go in input/<name>/slides.md"
echo "Example: input/example/slides.md"
