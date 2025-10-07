#!/bin/bash

# 🚀 Complete GitHub Repository Setup
# This script automates the entire GitHub repository creation process

echo "🛡️  HTTP Attack Detection System - GitHub Repository Setup"
echo "========================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the project directory"
    exit 1
fi

echo "✅ Project files found"
echo ""

# Install GitHub CLI if not present
if ! command -v gh &> /dev/null; then
    echo "📦 Installing GitHub CLI..."
    if command -v brew &> /dev/null; then
        brew install gh
    else
        echo "❌ Please install GitHub CLI manually: https://cli.github.com/"
        exit 1
    fi
fi

echo "✅ GitHub CLI ready"
echo ""

# Authenticate with GitHub
echo "🔐 Authenticating with GitHub..."
gh auth login --web

echo ""
echo "📂 Creating GitHub repository..."

# Create repository
gh repo create http-attack-detection-system \
    --public \
    --description "🛡️ Intelligent HTTP Attack Detection System - Multi-layer hybrid architecture combining rule-based detection with ML for real-time cybersecurity threat analysis" \
    --homepage "https://http-attack-detection-system-4qjauj7o5-alexstark110s-projects.vercel.app"

echo ""
echo "📤 Pushing code to GitHub..."

# Add remote and push
git remote add origin https://github.com/$(gh api user --jq .login)/http-attack-detection-system.git
git branch -M main
git push -u origin main

echo ""
echo "🎉 SUCCESS! Your repository is now live at:"
echo "   https://github.com/$(gh api user --jq .login)/http-attack-detection-system"
echo ""
echo "✅ Perfect for your resume!"
echo "✅ Live demo: https://http-attack-detection-system-4qjauj7o5-alexstark110s-projects.vercel.app"
echo ""
