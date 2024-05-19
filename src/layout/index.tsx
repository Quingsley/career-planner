import { Outlet } from "react-router-dom";
import { Header } from "../components/custom/header";
import { Footer } from "../components/custom/footer";

export function Layout() {
  return (
    <div className="flex flex-col justify-center px-4 sm:px-4 lg:px-24 lg:py-4 md:px-12 font-arimo">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
