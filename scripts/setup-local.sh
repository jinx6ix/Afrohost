#!/bin/bash

echo "🚀 Setting up Multi-Site Dashboard locally..."

# Backend setup
echo "📦 Setting up backend..."
cd multisite-dashboard-backend
npm install

# Create local .env from Vercel environment variables
echo "📝 Creating backend .env file..."
cat > .env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (use your Vercel values)
MONGODB_URI=${MONGODB_URI}
DB_NAME=${DB_NAME}

# JWT Configuration (use your Vercel values)
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

echo "✅ Backend environment configured"

# Frontend setup
echo "📦 Setting up frontend..."
cd ../multisite-dashboard-frontend
npm install

# Create local .env.local
echo "📝 Creating frontend .env.local file..."
cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Multi-Site Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF

echo "✅ Frontend environment configured"
echo "🎉 Setup complete! Run 'npm run dev' in both directories to start development servers."
