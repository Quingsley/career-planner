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

// BAD PATTERN FIGURE OUT BETTER WAY FOR ROUTE PROTECTION
function checkUser() {
  const user = store.getState().user;
  if (user.userId) {
    return true;
  }
  return false;
}

const isLoggedIn = checkUser();

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
