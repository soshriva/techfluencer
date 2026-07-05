#!/bin/bash
set -e

git pull origin main
git commit --allow-empty -m "Force fresh Pages deployment"
git push origin main

echo "Fresh GitHub Pages deployment triggered."
