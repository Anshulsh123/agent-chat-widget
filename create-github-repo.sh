#!/bin/bash

# Script to create GitHub repository and push code

set -e

echo "🚀 Creating GitHub repository for agent-chat-widget"
echo ""

# Check if token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN environment variable is not set."
    echo ""
    echo "To create a GitHub Personal Access Token:"
    echo "1. Go to: https://github.com/settings/tokens/new"
    echo "2. Give it a name (e.g., 'Agent Chat Widget')"
    echo "3. Select scope: 'repo' (full control of private repositories)"
    echo "4. Click 'Generate token'"
    echo "5. Copy the token (you won't see it again!)"
    echo ""
    read -sp "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
    echo ""
    echo ""
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token is required. Exiting."
    exit 1
fi

# Get GitHub username
echo "📡 Fetching your GitHub username..."
GITHUB_USER=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -o '"login":"[^"]*' | cut -d'"' -f4)

if [ -z "$GITHUB_USER" ]; then
    echo "❌ Failed to authenticate. Please check your token."
    exit 1
fi

echo "✅ Authenticated as: $GITHUB_USER"
echo ""

# Repository details
REPO_NAME="agent-chat-widget"
REPO_DESC="A beautiful React component for AI agent chat interface with canvas panel support"

# Check if repo already exists
echo "🔍 Checking if repository already exists..."
EXISTS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

if [ "$EXISTS" = "200" ]; then
    echo "⚠️  Repository already exists: https://github.com/$GITHUB_USER/$REPO_NAME"
    read -p "Do you want to push to existing repository? (y/n): " PUSH_EXISTING
    if [ "$PUSH_EXISTING" != "y" ]; then
        echo "Exiting."
        exit 1
    fi
else
    # Create repository
    echo "📦 Creating repository..."
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESC\",\"private\":false}" \
        https://api.github.com/user/repos)
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" != "201" ]; then
        echo "❌ Failed to create repository. HTTP Code: $HTTP_CODE"
        echo "Response: $BODY"
        exit 1
    fi
    
    echo "✅ Repository created successfully!"
fi

# Set up git remote
echo ""
echo "🔗 Setting up git remote..."
if git remote get-url origin &>/dev/null; then
    git remote set-url origin "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"
else
    git remote add origin "https://$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git branch -M main
git push -u origin main

# Clean up - remove token from remote URL
git remote set-url origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "✅ Success! Your repository is live at:"
echo "🌐 https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "📋 Public URL: https://github.com/$GITHUB_USER/$REPO_NAME"
