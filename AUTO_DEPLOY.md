# Auto-Deploy Setup

I've prepared everything for automatic deployment. Here's what's ready:

## ✅ What's Configured

1. **GitHub Actions Workflows** - Auto-deploy on push
2. **Vercel CLI** - Installed and ready
3. **Deployment Scripts** - Created
4. **Build Process** - Configured

## 🚀 Quick Deploy (Choose One Method)

### Method 1: GitHub Integration (Easiest - Recommended)

Both Render and Vercel can auto-deploy from GitHub:

#### For Render:
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub → Select `raorajan/HRMS-Lite`
4. Settings:
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`
5. Add environment variables (see DEPLOY_NOW.md)
6. Deploy - It will auto-deploy on every push!

#### For Vercel:
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import `raorajan/HRMS-Lite`
4. Settings:
   - Root Directory: `frontend`
   - Framework: Vite
5. Add environment variable: `VITE_API_URL` = your Render backend URL
6. Deploy - It will auto-deploy on every push!

### Method 2: CLI Deployment

#### Frontend (Vercel):
```bash
cd frontend
vercel login
vercel --prod
```

#### Backend (Render):
Requires API key:
```bash
export RENDER_API_KEY=your_key
export RENDER_SERVICE_ID=your_service_id
python deploy-render.py
```

## 🎯 Recommended: Use GitHub Integration

Once connected, every `git push` will automatically deploy both frontend and backend!
