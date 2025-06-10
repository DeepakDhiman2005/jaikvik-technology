import { lazy } from "react";

// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import AppLayout from "../layouts/AppLayout";

// pages
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Blogs = lazy(() => import("../pages/blogs/Blogs"));
const ContactUs = lazy(() => import("../pages/contact/ContactUs"));
const Careers = lazy(() => import("../pages/careers/Careers"));
const Service = lazy(() => import("../pages/service/Service"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: 'careers',
        element: <Careers />,
      },
      // services page
      {
        path: 'software-development/*',
        element: <Service />,
      }
    ],
  },
]);

const Routing = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routing;
