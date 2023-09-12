import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redirect from "./Redirect";
import Unshort from "./Unshort";
import List from "./List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:slug",
    element: <Redirect />
  },
  {
    path: "/unshort/:slug",
    element: <Unshort />
  },
  {
    path: "/list",
    element: <List />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
