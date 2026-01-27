#!/usr/bin/env bash

# Slidedown Installation Script
# Usage: curl -fsSL https://raw.githubusercontent.com/adubinsky/slidedown/main/install.sh | bash
# Or: ./install.sh (from repo)

set -e

REPO_URL="https://github.com/adubinsky/slidedown.git"
INSTALL_DIR="$HOME/.slidedown"
BIN_NAME="slidedown"

echo "🎬 Slidedown Installer"
echo "====================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed."
    echo ""
    echo "Install Node.js from: https://nodejs.org"
    echo "Recommended version: 18.0.0 or higher"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Found Node.js $NODE_VERSION"
echo ""

# Clone or update repository
if [ -d "$INSTALL_DIR" ]; then
    echo "📦 Updating existing installation at $INSTALL_DIR..."
    cd "$INSTALL_DIR"
    git pull origin main
else
    echo "📦 Cloning slidedown to $INSTALL_DIR..."
    git clone "$REPO_URL" "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

echo ""
echo "🔧 Running setup..."
./setup.sh

# Make the CLI wrapper executable
chmod +x "$INSTALL_DIR/bin/slidedown"

# Determine where to install the symlink
if [ -w "/usr/local/bin" ]; then
    # User has write access to /usr/local/bin
    INSTALL_PATH="/usr/local/bin/$BIN_NAME"
    echo ""
    echo "🔗 Creating symlink at $INSTALL_PATH..."
    ln -sf "$INSTALL_DIR/bin/slidedown" "$INSTALL_PATH"
    INSTALL_SUCCESS=true
elif [ -d "/usr/local/bin" ]; then
    # Directory exists but needs sudo
    echo ""
    echo "🔗 Creating symlink at /usr/local/bin/$BIN_NAME (requires sudo)..."
    sudo ln -sf "$INSTALL_DIR/bin/slidedown" "/usr/local/bin/$BIN_NAME"
    INSTALL_SUCCESS=true
else
    # Fall back to ~/bin
    mkdir -p "$HOME/bin"
    INSTALL_PATH="$HOME/bin/$BIN_NAME"
    echo ""
    echo "🔗 Creating symlink at $INSTALL_PATH..."
    ln -sf "$INSTALL_DIR/bin/slidedown" "$INSTALL_PATH"

    # Check if ~/bin is in PATH
    if [[ ":$PATH:" != *":$HOME/bin:"* ]]; then
        echo ""
        echo "⚠️  Note: $HOME/bin is not in your PATH"
        echo ""
        echo "Add this line to your ~/.zshrc or ~/.bashrc:"
        echo "  export PATH=\"\$HOME/bin:\$PATH\""
        echo ""
        echo "Then run: source ~/.zshrc"
    fi
    INSTALL_SUCCESS=true
fi

# Installation complete
echo ""
echo "✅ Slidedown installed successfully!"
echo ""
echo "📚 Quick start:"
echo "  slidedown help              - Show help"
echo "  slidedown build input/my-talk/slides.md my-talk moon"
echo "  slidedown validate input/my-talk/slides.md"
echo ""
echo "🌐 Start the preview server:"
echo "  cd $INSTALL_DIR && npm start"
echo ""
echo "📖 Full documentation:"
echo "  $INSTALL_DIR/README.md"
echo ""
