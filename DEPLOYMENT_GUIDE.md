# Deployment Guide - HRMS Lite

This guide will help you deploy both backend and frontend to production.

## 🎯 Deployment Strategy

- **Backend**: Render (Free tier available)
- **Frontend**: Vercel (Free tier available)
- **Database**: MongoDB Atlas (Free tier available)

---

## 📋 Prerequisites

1. **GitHub Account** (already have - raorajan)
2. **Render Account** - Sign up at https://render.com
3. **Vercel Account** - Sign up at https://vercel.com
4. **MongoDB Atlas Account** - Sign up at https://www.mongodb.com/cloud/atlas

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (Free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your database password
7. Add your database name: `mongodb+srv://username:password@cluster.mongodb.net/hrms_lite?retryWrites=true&w=majority`
8. **Save this connection string** - you'll need it for backend deployment

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Prepare Backend

The backend is already configured with:
- ✅ `render.yaml` - Render configuration
- ✅ `Procfile` - Process file for Render
- ✅ Updated `settings.py` - Production-ready settings
- ✅ `requirements.txt` - Includes gunicorn and whitenoise

### 2.2 Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**: Select `raorajan/HRMS-Lite`
4. **Configure the service**:
   - **Name**: `hrms-lite-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`

5. **Set Environment Variables**:
   ```
   SECRET_KEY=<generate-a-random-secret-key>
   DEBUG=False
   MONGO_URI=<your-mongodb-atlas-connection-string>
   DB_NAME=hrms_lite
   ALLOWED_HOSTS=hrms-lite-backend.onrender.com
   CORS_ALLOW_ALL_ORIGINS=True
   PYTHON_VERSION=3.13.0
   ```

   **To generate SECRET_KEY**, run this in Python:
   ```python
   import secrets
   print(secrets.token_urlsafe(50))
   ```

6. **Click "Create Web Service"**
7. **Wait for deployment** (takes 5-10 minutes)
8. **Copy your backend URL** (e.g., `https://hrms-lite-backend.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API URL

After backend is deployed, update the frontend API URL:

1. **Go to your GitHub repository**
2. **Edit** `frontend/.env.production`
3. **Update** `VITE_API_URL` with your backend URL:
   ```
   VITE_API_URL=https://hrms-lite-backend.onrender.com/api
   ```
4. **Commit and push**:
   ```bash
   git add frontend/.env.production
   git commit -m "chore: update production API URL"
   git push origin main
   ```

### 3.2 Deploy on Vercel

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**: `raorajan/HRMS-Lite`
4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://hrms-lite-backend.onrender.com/api` (your backend URL)

6. **Click "Deploy"**
7. **Wait for deployment** (takes 2-3 minutes)
8. **Copy your frontend URL** (e.g., `https://hrms-lite.vercel.app`)

---

## ✅ Step 4: Verify Deployment

### Test Backend:
1. Visit: `https://hrms-lite-backend.onrender.com/api/`
2. Should see: `{"message": "Welcome to HRMS Lite API", ...}`

### Test Frontend:
1. Visit your Vercel URL
2. Try adding an employee
3. Try marking attendance
4. Check if data persists

---

## 🔄 Step 5: Update Frontend After Backend Deployment

If you need to update the frontend API URL after backend is deployed:

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables
   - Update `VITE_API_URL` with your backend URL
   - Redeploy

OR

2. **Update in code**:
   - Edit `frontend/.env.production`
   - Commit and push (Vercel will auto-deploy)

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: Backend won't start
- **Solution**: Check logs in Render dashboard
- **Common issues**:
  - Missing environment variables
  - Wrong MongoDB connection string
  - Port binding issues

**Problem**: CORS errors
- **Solution**: Ensure `CORS_ALLOW_ALL_ORIGINS=True` or set `CORS_ALLOWED_ORIGINS` with your frontend URL

**Problem**: Database connection fails
- **Solution**: 
  - Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)
  - Verify connection string format
  - Check database user permissions

### Frontend Issues:

**Problem**: API calls fail
- **Solution**: 
  - Check `VITE_API_URL` environment variable
  - Verify backend is running
  - Check browser console for errors

**Problem**: Build fails
- **Solution**: 
  - Check Vercel build logs
  - Ensure all dependencies are in `package.json`
  - Check for TypeScript/ESLint errors

---

## 📝 Environment Variables Summary

### Backend (Render):
```
SECRET_KEY=<random-secret-key>
DEBUG=False
MONGO_URI=<mongodb-atlas-connection-string>
DB_NAME=hrms_lite
ALLOWED_HOSTS=hrms-lite-backend.onrender.com
CORS_ALLOW_ALL_ORIGINS=True
PYTHON_VERSION=3.13.0
```

### Frontend (Vercel):
```
VITE_API_URL=https://hrms-lite-backend.onrender.com/api
```

---

## 🚀 Quick Deploy Commands

After initial setup, updates are automatic via GitHub:

1. **Make changes**
2. **Commit**: `git add . && git commit -m "your message"`
3. **Push**: `git push origin main`
4. **Render and Vercel auto-deploy** ✨

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string saved
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend API URL updated
- [ ] Frontend deployed on Vercel
- [ ] Both services tested and working
- [ ] Environment variables configured
- [ ] GitHub repository connected

---

**Good luck with deployment! 🎉**
