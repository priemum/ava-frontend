import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/home";
export const publicRoutes = [
  { path: "/", element: Home },
  {
    path: "/about-us",
    element: lazy(() => import("../pages/aboutUs/index.jsx")),
  },
  {
    path: "/jobs",
    element: lazy(() => import("../pages/jobs/index.jsx")),
  },
  {
    path: "/articles",
    element: lazy(() => import("../pages/Articles/index.jsx")),
  },
  {
    path: "/articles/:slug",
    element: lazy(() => import("../pages/Article/index.jsx")),
  },
  {
    path: "/privacy-policy",
    element: lazy(() => import("../pages/privacy/index.jsx")),
  },
  {
    path: "/list-with-us",
    element: lazy(() => import("../pages/listing/index.jsx")),
  },
  {
    path: "/contact",
    element: lazy(() => import("../pages/contact/index.jsx")),
  },
  {
    path: "/enquiry",
    element: lazy(() => import("../pages/enquiry/index.jsx")),
  },

  {
    path: "/404",
    element: lazy(() => import("../components/UI/404NotFound/index.jsx")),
  },
  {
    path: "*",
    element: Navigate,
  },
];

export const protectedRoutes = [];
