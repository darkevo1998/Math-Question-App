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

## Quick Setup & Seed Instructions (< 10 minutes)

### Prerequisites
- Node.js 18+ and Python 3.8+
- PostgreSQL database (local or cloud)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Database Setup
```bash
# Set environment variables
export DATABASE_URL="postgresql://username:password@localhost:5432/mathquest"
export APP_SECRET_KEY="your-secret-key"

# Run migrations and seed data
cd backend
alembic upgrade head
python scripts/seed.py
```

### Environment Configuration
- Frontend: Set `VITE_API_BASE=http://localhost:5001` in `.env`
- Backend: Configure `DATABASE_URL` and `APP_SECRET_KEY`

## Development Time & Scope

**Total Time Spent: 6 hours**

### What Was Built
- Complete frontend with React/TypeScript and responsive UI
- Flask backend with RESTful API endpoints
- Database schema with lessons, problems, and user streaks
- Real-time problem validation and feedback
- Streak tracking system for gamification
- Deployment-ready configuration for Vercel

### What Was Cut/Not Built
- User authentication system (would add 2-3 hours)
- Advanced analytics dashboard (would add 4-5 hours)
- Social features like leaderboards (would add 3-4 hours)
- Offline mode support (would add 2-3 hours)
- Comprehensive test suite (would add 2-3 hours)

## Design Approach: Engaging Post-Lesson Progress Reveals

To keep teens motivated, I focused on **immediate gratification** and **visual progress**:

### Immediate Feedback System
- **Instant validation** with green/red indicators
- **Explanatory tooltips** that appear on incorrect answers
- **Progress bars** that fill in real-time as problems are solved

### Gamification Elements
- **Daily streak counter** prominently displayed
- **Achievement badges** for completing lesson sets
- **Visual progress maps** showing completed vs. remaining lessons
- **Celebratory animations** for correct answers and streak milestones

### Teen Psychology Considerations
- **Short attention spans**: Bite-sized problems with quick wins
- **Social validation**: Streak sharing potential (future feature)
- **Competitive drive**: Personal best tracking and improvement metrics
- **Visual learners**: Color-coded feedback and progress visualization

## Scalability: Handling 1000+ Simultaneous Students

For 1000+ concurrent users, I'd implement **horizontal scaling** with load balancers distributing traffic across multiple backend instances, **database connection pooling** to efficiently manage database connections, and **Redis caching** for frequently accessed lesson data and user sessions to reduce database load and improve response times.

## Product Review

### What Works Well for Teens

1. **Immediate Visual Feedback**: The instant green/red validation with explanatory tooltips keeps teens engaged and learning from mistakes without frustration.

2. **Streak Gamification**: The daily streak counter taps into teens' competitive nature and desire for consistency, creating a compelling reason to return daily.

3. **Clean, Modern Interface**: The responsive design with Tailwind CSS provides a professional, app-like experience that teens expect from modern platforms.

### Specific Improvements Needed

1. **User Authentication & Personalization**: Add login system to track individual progress, save preferences, and enable personalized learning paths based on performance.

2. **Social Features**: Implement leaderboards, friend challenges, and progress sharing to leverage teens' social nature and create peer motivation.

3. **Adaptive Difficulty**: Add AI-powered difficulty adjustment that automatically increases challenge based on performance, preventing boredom for advanced students while supporting struggling learners.

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