#!/bin/bash

# Define the path to add
tools_path="$(pwd)/tools/cli"

# Add the path to the shell configuration file if it doesn't already exist
if ! grep -qF "$tools_path" ~/.bashrc; then
    echo "export PATH=\"$tools_path:\$PATH\"" >> ~/.bashrc
    echo "Added $tools_path to ~/.bashrc"
else
    echo "$tools_path already exists in ~/.bashrc"
fi

# Update PATH in the current shell session
export PATH="$tools_path:$PATH"