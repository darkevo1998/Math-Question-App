import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">MathQuest</Link>
          <nav className="flex gap-4 text-sm">
            <Link className={pathname==='/'?'text-blue-600 font-semibold':'text-slate-600'} to="/">Lessons</Link>
            <Link className={pathname.startsWith('/profile')?'text-blue-600 font-semibold':'text-slate-600'} to="/profile">Profile</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-md sm:max-w-2xl px-4 py-4 flex-1">
        <Outlet />
      </main>
    </div>
  )
} 