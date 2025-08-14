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

console.log('MathQuest app starting...')

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

const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </React.StrictMode>,
  )
  console.log('App rendered successfully')
} else {
  console.error('Root element not found!')
} 