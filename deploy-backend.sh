#!/bin/bash
# Backend Deployment Script for Render

echo "🚀 Deploying Backend to Render..."

# Check if Render API key is set
if [ -z "$RENDER_API_KEY" ]; then
    echo "❌ Error: RENDER_API_KEY environment variable not set"
    echo "Get your API key from: https://dashboard.render.com/u/settings"
    exit 1
fi

# Get service ID from Render API (you'll need to set this)
if [ -z "$RENDER_SERVICE_ID" ]; then
    echo "⚠️  RENDER_SERVICE_ID not set. Creating service..."
    # This would require Render API to create service first
    echo "Please create service manually on Render dashboard first"
    exit 1
fi

# Trigger deployment
curl -X POST "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json"

echo "✅ Deployment triggered!"
