#!/bin/bash
# Frontend Deployment Script for Vercel

echo "🚀 Deploying Frontend to Vercel..."

cd frontend

# Check if Vercel is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "Run: vercel login"
    exit 1
fi

# Deploy to production
vercel --prod --yes

echo "✅ Frontend deployed!"
