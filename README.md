# MathQuest

A modern math learning platform built with React, TypeScript, and Flask, deployed on Vercel.

## Project Structure

This project is split into two separate repositories for better deployment and maintenance:

### Frontend Repository
- **Location**: `mathquest-frontend` (separate GitHub repository)
- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS
- **Deployment**: Vercel
- **Repository**: [mathquest-frontend](https://github.com/yourusername/mathquest-frontend)

### Backend Repository
- **Location**: `mathquest-backend` (separate GitHub repository)
- **Tech Stack**: Flask, SQLAlchemy, PostgreSQL, Alembic
- **Deployment**: Vercel
- **Repository**: [mathquest-backend](https://github.com/yourusername/mathquest-backend)

## Quick Start

### Frontend Setup
```bash
git clone https://github.com/yourusername/mathquest-frontend.git
cd mathquest-frontend
npm install
npm run dev
```

### Backend Setup
```bash
git clone https://github.com/yourusername/mathquest-backend.git
cd mathquest-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Features

- **Interactive Math Lessons**: Engaging problem-solving experience
- **Real-time Validation**: Instant feedback on problem solutions
- **Streak Tracking**: Gamified learning with daily streaks
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## Deployment

Both frontend and backend are deployed on Vercel for optimal performance and ease of use.

### Frontend Deployment
- Automatically deploys on push to main branch
- Environment variable: `VITE_API_BASE` points to backend API
- Custom domain support

### Backend Deployment
- Serverless functions on Vercel
- PostgreSQL database (Vercel Postgres or external)
- Environment variables for database and secrets

## Development Workflow

1. **Frontend Development**:
   - Work in `mathquest-frontend` repository
   - Use `npm run dev` for local development
   - API calls go to backend via `VITE_API_BASE`

2. **Backend Development**:
   - Work in `mathquest-backend` repository
   - Use `python app.py` for local development
   - Database migrations with Alembic

3. **Testing**:
   - Frontend: Manual testing in browser
   - Backend: pytest for API testing

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5001
```

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/mathquest
APP_SECRET_KEY=your-secret-key-here
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/{id}` - Get specific lesson
- `POST /api/submit` - Submit problem solution
- `GET /api/streak` - Get user streak
- `POST /api/streak` - Update user streak

## Database Schema

- **lessons**: Lesson information and metadata
- **problems**: Math problems with solutions
- **user_streaks**: User streak tracking data

## Contributing

1. Fork both repositories
2. Create feature branches
3. Make changes in both frontend and backend
4. Test thoroughly
5. Submit pull requests

## License

MIT License - see individual repository READMEs for details.

## Support

For issues and questions:
- Frontend issues: [mathquest-frontend issues](https://github.com/yourusername/mathquest-frontend/issues)
- Backend issues: [mathquest-backend issues](https://github.com/yourusername/mathquest-backend/issues) 