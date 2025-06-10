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
// const Service = lazy(() => import("../pages/service/Service"));
const CRMPage = lazy(() => import("../pages/service/CRMPage"));
const Mobile = lazy(() => import("../pages/service/Mobile_Application"));
const ERPPage = lazy(() => import("../pages/service/ERPPage"));
const CoustmisedSoftware = lazy(
  () => import("../pages/service/CoustmisedSoftware")
);
const WebDevelopment = lazy(() => import("../pages/service/Web_Development"));
const DigitalMarketing = lazy(
  () => import("../pages/service/Digital_Marketing")
);
const SocailMediaMarketting = lazy(
  () => import("../pages/service/Socail_Media")
);
const YoutubeMetaAds = lazy(() => import("../pages/service/Youtube_Meta_Ads"));
const Branding = lazy(() => import("../pages/service/Brand_Promotion"));
const SeoServices = lazy(() => import("../pages/service/Seo_Services"));
const FilmProduction = lazy(() => import("../pages/service/Film_Production"));

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
        path: "careers",
        element: <Careers />,
      },
      {
        path: "crm",
        element: <CRMPage />,
      },
      {
        path: "mobile-application",
        element: <Mobile />,
      },
      {
        path: "erp",
        element: <ERPPage />,
      },
      {
        path: "coustmised-software",
        element: <CoustmisedSoftware />,
      },
      {
        path: "web-development",
        element: <WebDevelopment />,
      },
      {
        path: "digital-marketing",
        element: <DigitalMarketing />,
      },
      {
        path: "social-media-marketing",
        element: <SocailMediaMarketting />,
      },
      {
        path: "youtube-meta-ads",
        element: <YoutubeMetaAds />,
      },
      {
        path: "branding",
        element: <Branding />,
      },
      {
        path: "seo-services",
        element: <SeoServices />,
      },
      {
        path: "film-production",
        element: <FilmProduction />,
      },
      {
        path: "packaging",
        element: <CRMPage />,
      },
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
