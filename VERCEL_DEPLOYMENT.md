# Vercel Deployment Guide for MathQuest

This guide will help you deploy your MathQuest application to Vercel with separate frontend and backend repositories.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: For hosting your repositories
3. **PostgreSQL Database**: Vercel Postgres or external provider

## Repository Structure

You'll need to create two separate GitHub repositories:

### 1. Frontend Repository (`mathquest-frontend`)
- Contains React/TypeScript frontend code
- Deployed as a static site on Vercel
- Communicates with backend API

### 2. Backend Repository (`mathquest-backend`)
- Contains Flask API code
- Deployed as serverless functions on Vercel
- Connects to PostgreSQL database

## Step 1: Create GitHub Repositories

### Frontend Repository
1. Create a new repository on GitHub named `mathquest-frontend`
2. Copy the frontend folder contents to this repository
3. Push to GitHub

### Backend Repository
1. Create a new repository on GitHub named `mathquest-backend`
2. Copy the backend folder contents to this repository
3. Push to GitHub

## Step 2: Deploy Backend to Vercel

### 1. Connect Backend Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your `mathquest-backend` repository
4. Vercel will automatically detect it as a Python project

### 2. Configure Backend Settings
1. **Framework Preset**: Python
2. **Root Directory**: `./` (default)
3. **Build Command**: Leave empty (Vercel handles this)
4. **Output Directory**: Leave empty
5. **Install Command**: `pip install -r requirements.txt`

### 3. Set Environment Variables
In the Vercel dashboard, add these environment variables:

```
DATABASE_URL=your-postgresql-connection-string
APP_SECRET_KEY=your-secure-secret-key
```

### 4. Deploy Backend
1. Click "Deploy"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://mathquest-backend.vercel.app`)

## Step 3: Set Up Database

### Option A: Vercel Postgres (Recommended)
1. In your backend project dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Choose your plan (Hobby is free)
5. Vercel will automatically set the `DATABASE_URL` environment variable

### Option B: External Database
Use any PostgreSQL provider (Supabase, AWS RDS, etc.) and set the `DATABASE_URL` environment variable.

## Step 4: Deploy Frontend to Vercel

### 1. Connect Frontend Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your `mathquest-frontend` repository
4. Vercel will automatically detect it as a React project

### 2. Configure Frontend Settings
1. **Framework Preset**: Vite
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### 3. Set Environment Variables
Add this environment variable:

```
VITE_API_BASE=https://your-backend-url.vercel.app
```

Replace `your-backend-url.vercel.app` with your actual backend URL from Step 2.

### 4. Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at the provided URL

## Step 5: Configure Database Migrations

### 1. Run Migrations Locally
```bash
cd mathquest-backend
alembic upgrade head
```

### 2. Or Use Vercel CLI
```bash
vercel env pull .env.local
alembic upgrade head
```

## Step 6: Test Your Deployment

### 1. Test Backend API
Visit your backend URL + `/api/health`:
```
https://your-backend.vercel.app/api/health
```
Should return: `{"status": "ok"}`

### 2. Test Frontend
Visit your frontend URL and verify:
- Pages load correctly
- API calls work
- Database operations function

## Environment Variables Reference

### Backend Environment Variables
```env
DATABASE_URL=postgresql://username:password@host:port/database
APP_SECRET_KEY=your-secure-secret-key
```

### Frontend Environment Variables
```env
VITE_API_BASE=https://your-backend.vercel.app
```

## Custom Domains (Optional)

### Backend Custom Domain
1. In Vercel dashboard, go to your backend project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `api.yourdomain.com`)
4. Update DNS records as instructed

### Frontend Custom Domain
1. In Vercel dashboard, go to your frontend project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `yourdomain.com`)
4. Update DNS records as instructed

## Development Workflow

### Local Development
1. **Backend**: Run `python app.py` locally
2. **Frontend**: Run `npm run dev` locally
3. **Database**: Use local PostgreSQL or Vercel Postgres

### Production Deployment
1. Push changes to GitHub
2. Vercel automatically deploys both repositories
3. Test the deployed versions

## Monitoring and Logs

### View Logs
1. In Vercel dashboard, go to your project
2. Click "Functions" tab
3. Click on any function to view logs

### Performance Monitoring
Vercel provides:
- Real-time performance metrics
- Function execution times
- Error tracking
- Analytics

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Vercel build logs
   - Verify all dependencies are in `requirements.txt` or `package.json`
   - Ensure proper file structure

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check database is accessible from Vercel
   - Ensure migrations have been run

3. **API Calls Failing**
   - Verify `VITE_API_BASE` points to correct backend URL
   - Check CORS settings in backend
   - Ensure backend is deployed and running

4. **Environment Variables Not Working**
   - Redeploy after adding environment variables
   - Check variable names are correct
   - Verify no typos in values

### Getting Help
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Cost Considerations

### Vercel Pricing
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for team features
- **Enterprise**: Custom pricing

### Database Costs
- **Vercel Postgres Hobby**: Free (limited storage)
- **Vercel Postgres Pro**: $20/month
- **External providers**: Varies by usage

## Security Best Practices

1. **Environment Variables**: Never commit secrets to Git
2. **Database**: Use connection pooling and SSL
3. **API Security**: Implement rate limiting and validation
4. **CORS**: Configure properly for production domains

## Performance Optimization

1. **Frontend**: Use code splitting and lazy loading
2. **Backend**: Optimize database queries
3. **CDN**: Vercel provides global CDN automatically
4. **Caching**: Implement appropriate caching strategies

---

Your MathQuest application should now be successfully deployed on Vercel with separate frontend and backend repositories! The platform provides excellent performance, automatic scaling, and easy deployment workflows.
