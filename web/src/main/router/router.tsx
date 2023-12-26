import React from "react";
import { ReactRouterDomProvider } from "../adapters";
import {
  makeHome,
  makeProfile,
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
    path: "/profile",
    element: makeProfile({}),
  },
];

export const Router: React.FC = () => {
  return <ReactRouterDomProvider routes={routes} />;
};
