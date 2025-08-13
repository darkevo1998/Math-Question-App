# MathQuest Frontend

This is the frontend application for MathQuest, built with React, TypeScript, and Vite, deployed on Vercel.

## Features

- Interactive math lessons and problems
- Real-time problem solving
- User streak tracking
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**:
   ```bash
   git clone <your-frontend-repo-url>
   cd mathquest-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=http://localhost:5001
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── pages/        # Page components
│   ├── api.ts        # API client
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── package.json      # Dependencies
├── vite.config.ts    # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── vercel.json       # Vercel configuration
```

## Pages

- **Lessons** (`/`) - List of available lessons
- **Lesson** (`/lesson/:id`) - Individual lesson with problems
- **Results** (`/results`) - Problem solving results
- **Profile** (`/profile`) - User profile and streak

## API Integration

The frontend communicates with the backend API through the `api.ts` file. Make sure to set the correct `VITE_API_BASE` environment variable to point to your backend API.

## Deployment on Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (optional): `npm i -g vercel`

### Deployment Steps

1. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   In Vercel dashboard, add these environment variables:
   - `VITE_API_BASE`: Your backend API URL (e.g., `https://your-backend.vercel.app`)

3. **Deploy**:
   Vercel will automatically deploy on every push to main branch

### Environment Variables

Required environment variables for production:

- `VITE_API_BASE`: Backend API base URL

## Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**:
   - Update `VITE_API_BASE` if needed

## Development Workflow

1. **Feature Development**:
   - Create a new branch for your feature
   - Make your changes
   - Test locally
   - Push to GitHub

2. **Deployment**:
   - Merge to main branch
   - Vercel automatically deploys
   - Test the deployed version

## Styling

The project uses Tailwind CSS for styling. Key design principles:

- Responsive design
- Dark/light mode support
- Consistent spacing and typography
- Accessible color contrast

## Testing

Currently, the project doesn't include automated tests. Consider adding:

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## Performance

- Code splitting with React.lazy()
- Optimized images
- Minified CSS and JS
- CDN delivery via Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
