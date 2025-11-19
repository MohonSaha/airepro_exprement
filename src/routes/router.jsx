import Layout from "@/layouts/Layout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import FreelancerRecurringJobReviews from "@/pages/reviewRating/FreelancerRecurringJobReviews";
import { createBrowserRouter } from "react-router-dom";

export const routers = createBrowserRouter([
  {
    element: <Layout />, // Navbar is included here
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/rating", element: <FreelancerRecurringJobReviews /> },
    ],
  },
]);
