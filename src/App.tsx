// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css'
import '@radix-ui/themes/styles.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { ImageDetails } from './pages/ImageDetails';
import { UserImages } from './pages/UserImages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';

function App() {
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

  return (
    <>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Theme>
    </>
  )
}

export default App
