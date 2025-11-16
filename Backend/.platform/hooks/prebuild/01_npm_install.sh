#!/bin/bash
set -e

echo "Running prebuild hook - installing npm dependencies"
cd /var/app/staging

# Remove node_modules if it exists to ensure clean install
if [ -d "node_modules" ]; then
    echo "Removing existing node_modules"
    rm -rf node_modules
fi

# Clean npm cache
npm cache clean --force

# Install dependencies
echo "Running npm install"
npm install --production

echo "npm install completed successfully"
