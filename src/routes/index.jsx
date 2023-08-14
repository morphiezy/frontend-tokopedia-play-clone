import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Watch from "@/pages/Watch";
import MainLayout from "@/components/layout/main";
import PrivateRoute from "./PrivateRoute";
import Search from "@/pages/Search";

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/watch/:video_id",
        element: <Watch />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ]
  },
  {
    path: "/auth/:flow",
    element: (
      <PrivateRoute redirect="/" isAuth={!Cookies.get("token")}>
        <Auth />
      </PrivateRoute>
    ),
  },  
]);

export default router;
