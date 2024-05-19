import { Layout } from "./layout";
import { LandingPage } from "./pages/landing-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([{ path: "/", element: <Layout />, children: [{ path: "/", element: <LandingPage /> }] }]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
