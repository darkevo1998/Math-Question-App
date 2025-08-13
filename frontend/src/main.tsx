import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './styles.css'
import App from './App'
import Lessons from './pages/Lessons'
import Lesson from './pages/Lesson'
import Results from './pages/Results'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Lessons /> },
      { path: 'lessons/:id', element: <Lesson /> },
      { path: 'results', element: <Results /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </React.StrictMode>,
) 