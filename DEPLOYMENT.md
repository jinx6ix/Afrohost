# 🚀 Deployment Guide

## Prerequisites
- Vercel account
- MongoDB Atlas database
- Environment variables configured in Vercel

## Backend Deployment

### 1. Deploy Backend API
\`\`\`bash
cd multisite-dashboard-backend
vercel --prod
\`\`\`

### 2. Configure Environment Variables
Ensure these are set in your Vercel project:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `FRONTEND_URL`
- `DB_NAME`
- `JWT_EXPIRES_IN`

## Frontend Deployment

### 1. Update API URL
Update `NEXT_PUBLIC_API_URL` in Vercel to point to your deployed backend:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
\`\`\`

### 2. Deploy Frontend
\`\`\`bash
cd multisite-dashboard-frontend
vercel --prod
\`\`\`

## Post-Deployment Setup

### 1. Create Admin User
Run the admin user creation script:
\`\`\`bash
npm run create-admin
\`\`\`

### 2. Test the Application
1. Visit your frontend URL
2. Login with: admin@example.com / password123
3. Verify all features work correctly

## Production Checklist
- [ ] Environment variables configured
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Admin user created
- [ ] Database connection working
- [ ] Authentication working
- [ ] CORS configured correctly
- [ ] SSL certificates active

## Monitoring
- Check Vercel function logs for errors
- Monitor MongoDB Atlas metrics
- Set up alerts for critical issues

## Troubleshooting
- Verify environment variables are set correctly
- Check function logs in Vercel dashboard
- Ensure MongoDB Atlas allows connections from Vercel IPs
- Verify CORS settings match your domains
