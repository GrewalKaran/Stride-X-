import {createBrowserRouter} from 'react-router'
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/login';
import Home from './features/run/pages/Home';
import SoloRace from './features/run/pages/SoloRace';
import RaceReport from './features/run/pages/RaceReport';
import Multiplayer from './features/run/pages/Multiplayer';
import WaitingRoom from './features/run/pages/WaitingRoom';
import MultiplayerRace from './features/run/pages/MultiplayerRace';


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
  {
    path: "/multiplayer",
    element: <Multiplayer />,
  },
  {
    path: "/waiting-room/:roomCode",
    element: <WaitingRoom />,
  },
  {
    path: "/multiplayer-race/:roomCode",
    element: <MultiplayerRace/>,
  },
]);