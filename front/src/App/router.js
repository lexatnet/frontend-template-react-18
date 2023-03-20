import { createBrowserRouter } from "react-router-dom";
import SignIn from "@root/scenes/SignIn";
import Entities from "@root/scenes/Entities";
import EntityCreate from "@root/scenes/Entities/Create";
import EntityEdit from "@root/scenes/Entities/Edit";
import Home from "@root/scenes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/entities",
    element: <Entities />,
  },
  {
    path: "/entities/new",
    element: <EntityCreate />,
  },
  {
    path: "/entities/:entityId",
    element: <EntityEdit />,
  },
]);

export default router;
