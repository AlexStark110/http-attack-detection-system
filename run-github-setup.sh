#!/bin/bash

# 🚀 FINAL GITHUB REPOSITORY SETUP
# Run these commands one by one

echo "🛡️ Creating your HTTP Attack Detection System repository..."
echo ""

# Step 1: Authenticate (will open browser)
echo "Step 1: Authenticating with GitHub..."
gh auth login

# Step 2: Create repository
echo "Step 2: Creating repository..."
gh repo create http-attack-detection-system \
    --public \
    --description "🛡️ Intelligent HTTP Attack Detection System - Multi-layer hybrid architecture combining rule-based detection with ML for real-time cybersecurity threat analysis" \
    --homepage "https://http-attack-detection-system-4qjauj7o5-alexstark110s-projects.vercel.app"

# Step 3: Push code
echo "Step 3: Pushing your code..."
git remote add origin https://github.com/$(gh api user --jq .login)/http-attack-detection-system.git
git push -u origin main

echo ""
echo "🎉 SUCCESS! Your repository is live!"
echo "GitHub: https://github.com/$(gh api user --jq .login)/http-attack-detection-system"
echo "Demo: https://http-attack-detection-system-4qjauj7o5-alexstark110s-projects.vercel.app"
echo ""
echo "✅ Perfect for your resume!"
