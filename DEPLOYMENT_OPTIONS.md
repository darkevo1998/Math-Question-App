# Vercel Deployment Options for Monorepo

This guide explains the different ways to deploy your MathQuest app (frontend + backend) on Vercel from a single repository.

## 🚀 **Option 1: Separate Projects (Current Setup - Recommended)**

Deploy frontend and backend as separate Vercel projects from the same repository.

### **Setup:**
1. **Backend Project**: Root directory = `backend/`
2. **Frontend Project**: Root directory = `frontend/`

### **Configuration Files:**
- `backend/vercel.json` - Backend configuration
- `frontend/vercel.json` - Frontend configuration

### **Advantages:**
- ✅ **Independent scaling** - Each can scale separately
- ✅ **Different domains** - `api.yourdomain.com` and `yourdomain.com`
- ✅ **Independent deployments** - Deploy one without affecting the other
- ✅ **Better performance** - Frontend served from CDN, backend as serverless
- ✅ **Easier debugging** - Separate logs and monitoring

### **Environment Variables:**
- **Backend**: `DATABASE_URL`, `APP_SECRET_KEY`
- **Frontend**: `VITE_API_URL=https://your-backend.vercel.app`

---

## 🚀 **Option 2: Single Project with API Routes**

Deploy everything as one Vercel project with API routes.

### **Setup:**
1. **Single Vercel Project**: Root directory = `/` (root of repo)
2. **Use root `vercel.json`** for configuration

### **Configuration:**
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/api/index.py"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "backend/api/index.py": {
      "runtime": "python3.9"
    }
  }
}
```

### **Advantages:**
- ✅ **Single deployment** - Everything deploys together
- ✅ **Single domain** - `yourdomain.com` for both frontend and API
- ✅ **Simpler setup** - One project to manage
- ✅ **Cost effective** - Single project billing

### **Environment Variables:**
- `DATABASE_URL`, `APP_SECRET_KEY`, `VITE_API_URL=/api`

---

## 🚀 **Option 3: Vercel Monorepo with Workspaces**

Use Vercel's advanced monorepo features.

### **Setup:**
1. **Root `package.json`** with workspaces
2. **Root `vercel.json`** with monorepo configuration
3. **Vercel CLI** for advanced features

### **Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/backend/api/index.py"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **Advantages:**
- ✅ **Advanced features** - Workspace management
- ✅ **Better development** - Concurrent dev servers
- ✅ **Shared dependencies** - Optimized builds
- ✅ **Vercel CLI integration** - Advanced deployment features

---

## 📊 **Comparison Table**

| Feature | Separate Projects | Single Project | Monorepo |
|---------|------------------|----------------|----------|
| **Setup Complexity** | Medium | Low | High |
| **Deployment Speed** | Fast | Medium | Fast |
| **Scaling** | Independent | Combined | Independent |
| **Cost** | Higher | Lower | Medium |
| **Debugging** | Easy | Medium | Easy |
| **Domain Management** | Separate | Single | Flexible |

---

## 🎯 **Recommendation**

### **For Production: Option 1 (Separate Projects)**
- Better performance and scalability
- Independent deployments
- Easier monitoring and debugging

### **For Development/Testing: Option 2 (Single Project)**
- Simpler setup
- Single domain
- Cost effective

### **For Enterprise: Option 3 (Monorepo)**
- Advanced features
- Better development experience
- Workspace management

---

## 🔧 **Migration Guide**

### **From Separate Projects to Single Project:**

1. **Create root `vercel.json`:**
   ```bash
   # Copy the vercel.json content from above
   ```

2. **Update environment variables:**
   - Set `VITE_API_URL=/api` (relative path)

3. **Deploy as single project:**
   - Root directory = `/`
   - Framework = Vite

4. **Test endpoints:**
   - Frontend: `https://yourdomain.com`
   - API: `https://yourdomain.com/api/health`

### **From Single Project to Separate Projects:**

1. **Create separate projects:**
   - Backend: Root directory = `backend/`
   - Frontend: Root directory = `frontend/`

2. **Update environment variables:**
   - Backend: `DATABASE_URL`, `APP_SECRET_KEY`
   - Frontend: `VITE_API_URL=https://your-backend.vercel.app`

3. **Deploy both projects**

---

## 🚨 **Important Notes**

### **API URL Configuration:**
- **Separate projects**: Use full URL (`https://api.yourdomain.com`)
- **Single project**: Use relative path (`/api`)

### **CORS Configuration:**
- **Separate projects**: Configure CORS for cross-domain requests
- **Single project**: No CORS needed (same domain)

### **Database Access:**
- All options work the same for database connections
- Use the same `DATABASE_URL` environment variable

### **Build Process:**
- **Separate projects**: Each builds independently
- **Single project**: Frontend builds, backend deploys as function
