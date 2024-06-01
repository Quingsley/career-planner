import { Layout } from "./layout";
import Auth from "./pages/auth/auth_page";
import { LandingPage } from "./pages/landing-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
