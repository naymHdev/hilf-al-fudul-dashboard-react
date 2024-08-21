import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Layout from "../Layouts/Layout";
import AddProjects from "../Pages/AddProjects/AddProjects";
import AddImages from "../Pages/AddImages/AddImages";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/addImages",
        element: <AddImages />,
      },
      {
        path: "/addProjects",
        element: <AddProjects />,
      },
    ],
  },
]);

export default Router;
