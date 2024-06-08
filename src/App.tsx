import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./layout";
import Auth from "./pages/auth/auth_page";
import { DashBoard } from "./pages/dashboard/dashboard";
import { ErrorPage } from "./pages/error-page";
import { LandingPage } from "./pages/landing-page";
import { ProfileSetUp } from "./pages/profile/profile-setup";
import { persistor, store } from "./store";
import { FileUploader } from "./pages/file-uploader/file-uploader";
import { EXploreCareers } from "./pages/file-uploader/explore-careers";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      { path: "/", element: <LandingPage /> },
      {
        path: "/profile-setup",
        element: <ProfileSetUp />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/cv-uploader",
        element: <FileUploader />,
      },
      {
        path: "/explore-careers",
        element: <EXploreCareers />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={routes} />;
      </PersistGate>
    </Provider>
  );
}

export default App;
