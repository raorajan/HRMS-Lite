# Quick Deployment Steps

## 🚀 Fast Track Deployment

### Step 1: MongoDB Atlas (5 minutes)

1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. **Save it!**

---

### Step 2: Deploy Backend - Render (10 minutes)

1. **Sign up**: https://render.com (use GitHub login)
2. **New Web Service** → Connect `raorajan/HRMS-Lite`
3. **Settings**:
   - Name: `hrms-lite-backend`
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`

4. **Environment Variables**:
   ```
   SECRET_KEY=<generate-random-key>
   DEBUG=False
   MONGO_URI=<your-mongodb-connection-string>
   DB_NAME=hrms_lite
   ALLOWED_HOSTS=hrms-lite-backend.onrender.com
   CORS_ALLOW_ALL_ORIGINS=True
   ```

5. **Deploy** → Wait → Copy URL

---

### Step 3: Deploy Frontend - Vercel (5 minutes)

1. **Sign up**: https://vercel.com (use GitHub login)
2. **Import Project** → `raorajan/HRMS-Lite`
3. **Settings**:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

4. **Environment Variable**:
   ```
   VITE_API_URL=https://hrms-lite-backend.onrender.com/api
   ```
   (Replace with your actual backend URL)

5. **Deploy** → Done! 🎉

---

## ✅ That's It!

Your app is live at your Vercel URL!

**Full guide**: See `DEPLOYMENT_GUIDE.md` for detailed instructions.
