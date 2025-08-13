#!/bin/bash

# MathQuest Repository Separation Script
# This script helps you separate the frontend and backend into different repositories

echo "🚀 MathQuest Repository Separation Script"
echo "=========================================="

# Create directories for the separated repositories
echo "📁 Creating repository directories..."

# Create backend repository
mkdir -p mathquest-backend
echo "✅ Created mathquest-backend directory"

# Create frontend repository  
mkdir -p mathquest-frontend
echo "✅ Created mathquest-frontend directory"

# Copy backend files
echo "📋 Copying backend files..."
cp -r backend/* mathquest-backend/
cp backend/README.md mathquest-backend/README.md
echo "✅ Backend files copied"

# Copy frontend files
echo "📋 Copying frontend files..."
cp -r frontend/* mathquest-frontend/
cp frontend/README.md mathquest-frontend/README.md
echo "✅ Frontend files copied"

# Create .gitignore files
echo "📝 Creating .gitignore files..."

# Backend .gitignore
cat > mathquest-backend/.gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual Environment
venv/
env/
ENV/
.venv/
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.production

# Database
*.db
*.sqlite3

# Logs
*.log
logs/

# Alembic
alembic/versions/*.py
!alembic/versions/__init__.py
EOF

# Frontend .gitignore
cat > mathquest-frontend/.gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity
EOF

echo "✅ .gitignore files created"

# Create initialization scripts
echo "📝 Creating initialization scripts..."

# Backend init script
cat > mathquest-backend/init-repo.sh << 'EOF'
#!/bin/bash

echo "🚀 Initializing MathQuest Backend Repository"
echo "============================================"

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: MathQuest Backend API"

echo "✅ Backend repository initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub named 'mathquest-backend'"
echo "2. Add the remote origin: git remote add origin https://github.com/yourusername/mathquest-backend.git"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy to Vercel following the instructions in README.md"
EOF

# Frontend init script
cat > mathquest-frontend/init-repo.sh << 'EOF'
#!/bin/bash

echo "🚀 Initializing MathQuest Frontend Repository"
echo "============================================="

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: MathQuest Frontend"

echo "✅ Frontend repository initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub named 'mathquest-frontend'"
echo "2. Add the remote origin: git remote add origin https://github.com/yourusername/mathquest-frontend.git"
echo "3. Push to GitHub: git push -u origin main"
echo "4. Deploy to Vercel following the instructions in README.md"
EOF

# Make scripts executable
chmod +x mathquest-backend/init-repo.sh
chmod +x mathquest-frontend/init-repo.sh

echo "✅ Initialization scripts created"

# Create deployment instructions
echo "📝 Creating deployment instructions..."

cat > DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# MathQuest Deployment Instructions

## Repository Separation Complete! 🎉

Your MathQuest project has been separated into two repositories:

### 📁 mathquest-backend/
Contains the Flask API backend with:
- Flask application
- SQLAlchemy models
- Database migrations
- API routes
- Vercel configuration

### 📁 mathquest-frontend/
Contains the React frontend with:
- React components
- TypeScript code
- Vite build configuration
- Tailwind CSS styling
- Vercel configuration

## Next Steps

### 1. Initialize Backend Repository
```bash
cd mathquest-backend
./init-repo.sh
```

### 2. Initialize Frontend Repository
```bash
cd mathquest-frontend
./init-repo.sh
```

### 3. Create GitHub Repositories
1. Go to [github.com](https://github.com)
2. Create two new repositories:
   - `mathquest-backend`
   - `mathquest-frontend`

### 4. Push to GitHub
For each repository:
```bash
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

### 5. Deploy to Vercel
Follow the detailed instructions in `VERCEL_DEPLOYMENT.md`

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@host:port/database
APP_SECRET_KEY=your-secure-secret-key
```

### Frontend (.env)
```env
VITE_API_BASE=https://your-backend.vercel.app
```

## Development Workflow

1. **Backend Development**: Work in `mathquest-backend/`
2. **Frontend Development**: Work in `mathquest-frontend/`
3. **Local Testing**: Run both locally for testing
4. **Deployment**: Push to GitHub triggers Vercel deployment

## Support

- Backend issues: Create issues in `mathquest-backend` repository
- Frontend issues: Create issues in `mathquest-frontend` repository
- Deployment help: See `VERCEL_DEPLOYMENT.md`
EOF

echo "✅ Deployment instructions created"

echo ""
echo "🎉 Repository separation complete!"
echo "=================================="
echo ""
echo "📁 Created directories:"
echo "   - mathquest-backend/"
echo "   - mathquest-frontend/"
echo ""
echo "📋 Next steps:"
echo "1. Review the created directories"
echo "2. Run initialization scripts in each directory"
echo "3. Create GitHub repositories"
echo "4. Deploy to Vercel"
echo ""
echo "📖 See DEPLOYMENT_INSTRUCTIONS.md for detailed steps"
echo "📖 See VERCEL_DEPLOYMENT.md for Vercel-specific instructions"
echo ""
echo "Happy coding! 🚀"
