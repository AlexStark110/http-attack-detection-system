#!/bin/bash

# HTTP Attack Detection System - Deployment Script
# This script helps you deploy to various free hosting platforms

echo "🛡️  HTTP Attack Detection System - Deployment Helper"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

echo "Choose your deployment platform:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. GitHub Pages"
echo "4. Cloudflare Pages"
echo ""
read -p "Enter option (1-4): " option

case $option in
    1)
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        echo "Step 1: Install Vercel CLI (if not installed)"
        read -p "Install Vercel CLI? (y/n): " install
        if [ "$install" = "y" ]; then
            npm i -g vercel
        fi
        
        echo ""
        echo "Step 2: Login to Vercel"
        vercel login
        
        echo ""
        echo "Step 3: Deploy"
        vercel
        
        echo ""
        echo "✅ Deployment complete!"
        echo "Your app is now live on Vercel!"
        ;;
        
    2)
        echo ""
        echo "📦 Deploying to Netlify..."
        echo ""
        echo "Step 1: Install Netlify CLI (if not installed)"
        read -p "Install Netlify CLI? (y/n): " install
        if [ "$install" = "y" ]; then
            npm i -g netlify-cli
        fi
        
        echo ""
        echo "Step 2: Login to Netlify"
        netlify login
        
        echo ""
        echo "Step 3: Initialize site"
        netlify init
        
        echo ""
        echo "Step 4: Deploy"
        netlify deploy --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo "Your app is now live on Netlify!"
        ;;
        
    3)
        echo ""
        echo "📦 Setting up GitHub Pages..."
        echo ""
        echo "Steps to deploy:"
        echo "1. Create a new repository on GitHub"
        echo "2. Add remote: git remote add origin <your-repo-url>"
        echo "3. Push code: git push -u origin main"
        echo "4. Go to repository Settings → Pages"
        echo "5. Select 'main' branch and '/' (root) folder"
        echo "6. Click Save"
        echo ""
        echo "Your site will be live at: https://<username>.github.io/<repo-name>"
        ;;
        
    4)
        echo ""
        echo "📦 Deploying to Cloudflare Pages..."
        echo ""
        echo "Steps to deploy:"
        echo "1. Go to https://pages.cloudflare.com/"
        echo "2. Click 'Create a project'"
        echo "3. Connect your GitHub repository"
        echo "4. Configure build settings:"
        echo "   - Build command: (leave empty)"
        echo "   - Build output directory: /"
        echo "5. Click 'Save and Deploy'"
        echo ""
        echo "Your site will be live in a few minutes!"
        ;;
        
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "=================================================="
echo "🎉 Thank you for using the deployment helper!"
echo "=================================================="
