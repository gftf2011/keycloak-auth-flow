import React from "react";
import { ReactRouterDomProvider } from "../adapters";
import {
  makeHome,
  makeProtected,
  makeSignIn,
} from "../factories/presentation/pages";

const routes = [
  {
    path: "/",
    element: makeHome({}),
  },
  {
    path: "/sign-in",
    element: makeSignIn({}),
  },
  {
    path: "/protected",
    element: makeProtected({}),
  },
];

export const Router: React.FC = () => {
  return <ReactRouterDomProvider routes={routes} />;
};
