import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/home";
const ArticlesPage = lazy(() => import("../pages/Articles/index.jsx"));
const JobPage = lazy(() => import("../pages/jobs/index.jsx"));
const PropertiesPage = lazy(() => import("../pages/properties/index.jsx"));
export const publicRoutes = [
  { path: "/", element: Home },
  {
    path: "/about-us",
    element: lazy(() => import("../pages/aboutUs/index.jsx")),
  },
  {
    path: "/jobs",
    element: JobPage,
  },
  {
    path: "/jobs/:search",
    element: JobPage,
  },
  {
    path: "/articles",
    element: ArticlesPage,
  },
  {
    path: "/articles/:search",
    element: ArticlesPage,
  },
  {
    path: "/article/:slug",
    element: lazy(() => import("../pages/Article/index.jsx")),
  },
  {
    path: "/properties",
    element: PropertiesPage,
  },
  {
    path: "/properties/:search",
    element: PropertiesPage,
  },
  {
    path: "/properties/:PriceMin/:PriceMax/:AreaMin/:AreaMax/:purpose/:rentFrequency/:completionStatus/:Bedrooms/:parentCategory/:CategoryID/:Bathrooms/:Addresses/:DownPayemntMin/:DownPayemntMax/:InstallmentMin/:InstallmentMax/:Posthandover/:PaymentPlan",
    element: PropertiesPage,
  },
  {
    path: "/property/:id",
    element: lazy(() => import("../pages/property/index.jsx")),
  },
  {
    path: "/addresses/:addressId",
    element: lazy(() => import("../pages/addresses/index.jsx")),
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
