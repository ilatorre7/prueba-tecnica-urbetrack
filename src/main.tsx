import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@radix-ui/themes/styles.css'
//import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { Login } from './pages/Login.tsx'
import { Home } from './pages/Home.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ImageDetails } from './pages/ImageDetails.tsx'
import { UserImages } from './pages/UserImages.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/images/:id",
    element: <ImageDetails />,
  },
  {
    path: "/my-images",
    element: <UserImages />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
  </StrictMode>,
)
