import {
  publicRoutesPath as publicPath,
  privateRoutesPath as privatePath,
} from "config/routesPath";
import Home from "pages/Home/Home";
import LoginForm from "pages/LoginForm/LoginForm";

export const publicRoutes = [
  {
    path: publicPath.login,
    element: <LoginForm />,
  },
];

export const privateRoutes = [
  {
    path: privatePath.home,
    element: <Home />,
    
  },
];
