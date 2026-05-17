import {createBrowserRouter} from 'react-router'
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/login';
import Home from './features/run/pages/Home';

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/",
    element: <Home/>
  }
]);