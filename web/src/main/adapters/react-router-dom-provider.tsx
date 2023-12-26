import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

type Props = {
  routes: RouteObject[];
};

export const ReactRouterDomProvider: React.FC<Props> = ({ routes }) => {
  const router = createBrowserRouter(routes);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
