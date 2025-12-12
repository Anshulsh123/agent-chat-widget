#!/bin/bash

# Script to set up GitHub repository for agent-chat-widget

echo "🚀 Setting up GitHub repository for agent-chat-widget"
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "✅ Remote 'origin' already exists"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Current remote: $REMOTE_URL"
else
    echo "📝 Please create a new repository on GitHub:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: agent-chat-widget"
    echo "   3. Description: A beautiful React component for AI agent chat interface with canvas panel support"
    echo "   4. Choose Public"
    echo "   5. DO NOT initialize with README, .gitignore, or license"
    echo "   6. Click 'Create repository'"
    echo ""
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -p "Enter the repository URL (e.g., https://github.com/$GITHUB_USERNAME/agent-chat-widget.git): " REPO_URL
    
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Remote added: $REPO_URL"
    else
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
fi

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Done! Your repository is now live at:"
git remote get-url origin | sed 's/\.git$//'
echo ""
echo "🌐 Public URL: $(git remote get-url origin | sed 's/\.git$//' | sed 's/git@github.com:/https:\/\/github.com\//')"
