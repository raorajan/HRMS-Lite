// Vercel Deployment Script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel deployment...');

const frontendDir = path.join(__dirname, 'frontend');

// Check if .env.production exists
const envFile = path.join(frontendDir, '.env.production');
if (!fs.existsSync(envFile)) {
    console.log('⚠️  .env.production not found. Creating template...');
    fs.writeFileSync(envFile, 'VITE_API_URL=https://your-backend-url.onrender.com/api\n');
    console.log('✅ Created .env.production - Update with your backend URL!');
}

try {
    process.chdir(frontendDir);
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('🏗️  Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('🚀 Deploying to Vercel...');
    console.log('Note: You may need to login first with: vercel login');
    execSync('vercel --prod --yes', { stdio: 'inherit' });
    
    console.log('✅ Frontend deployed successfully!');
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\n💡 To deploy manually:');
    console.log('   1. cd frontend');
    console.log('   2. vercel login');
    console.log('   3. vercel --prod');
    process.exit(1);
}
