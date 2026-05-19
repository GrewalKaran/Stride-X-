import {createBrowserRouter} from 'react-router'
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/login';
import Home from './features/run/pages/Home';
import SoloRace from './features/run/pages/SoloRace';
import RaceReport from './features/run/pages/RaceReport';


export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/solo-run",
    element: <SoloRace />,
  },
  {
    path: "/race-report/:raceId",
    element: <RaceReport />,
  },
]);