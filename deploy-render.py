#!/usr/bin/env python3
"""
Render Deployment Script
Requires: RENDER_API_KEY and RENDER_SERVICE_ID environment variables
"""
import os
import requests
import json
import sys

def deploy_to_render():
    api_key = os.getenv('RENDER_API_KEY')
    service_id = os.getenv('RENDER_SERVICE_ID')
    
    if not api_key:
        print("❌ Error: RENDER_API_KEY environment variable not set")
        print("Get your API key from: https://dashboard.render.com/u/settings")
        return False
    
    if not service_id:
        print("⚠️  RENDER_SERVICE_ID not set.")
        print("Creating service via API requires more setup.")
        print("Please create service manually on Render dashboard first:")
        print("1. Go to https://dashboard.render.com")
        print("2. New Web Service → Connect GitHub → Select HRMS-Lite")
        print("3. Root Directory: backend")
        print("4. Build: pip install -r requirements.txt")
        print("5. Start: gunicorn core.wsgi:application --bind 0.0.0.0:$PORT")
        return False
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    url = f'https://api.render.com/v1/services/{service_id}/deploys'
    
    try:
        response = requests.post(url, headers=headers)
        response.raise_for_status()
        print("✅ Deployment triggered successfully!")
        print(f"Deployment ID: {response.json().get('id')}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Deployment failed: {e}")
        if hasattr(e, 'response') and e.response:
            print(f"Response: {e.response.text}")
        return False

if __name__ == '__main__':
    deploy_to_render()
