#!/usr/bin/env bash

# Slidedown Uninstall Script

set -e

INSTALL_DIR="$HOME/.slidedown"
BIN_NAME="slidedown"

echo "🗑️  Slidedown Uninstaller"
echo "======================="
echo ""

# Remove symlinks
REMOVED_ANY=false

if [ -L "/usr/local/bin/$BIN_NAME" ]; then
    echo "Removing /usr/local/bin/$BIN_NAME (may require sudo)..."
    if [ -w "/usr/local/bin/$BIN_NAME" ]; then
        rm "/usr/local/bin/$BIN_NAME"
    else
        sudo rm "/usr/local/bin/$BIN_NAME"
    fi
    REMOVED_ANY=true
fi

if [ -L "$HOME/bin/$BIN_NAME" ]; then
    echo "Removing $HOME/bin/$BIN_NAME..."
    rm "$HOME/bin/$BIN_NAME"
    REMOVED_ANY=true
fi

# Remove installation directory
if [ -d "$INSTALL_DIR" ]; then
    echo "Removing installation directory $INSTALL_DIR..."
    rm -rf "$INSTALL_DIR"
    REMOVED_ANY=true
fi

if [ "$REMOVED_ANY" = true ]; then
    echo ""
    echo "✅ Slidedown uninstalled successfully"
else
    echo "ℹ️  Slidedown was not found"
fi

echo ""
