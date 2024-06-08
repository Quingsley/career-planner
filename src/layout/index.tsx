import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/custom/footer";
import { Header } from "../components/custom/header";
import { ToastAction } from "../components/ui/toast";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearError } from "../store/slices/error-slice";

export function Layout() {
  const errors = useAppSelector(state => state.error);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
          action: (
            <ToastAction onClick={() => dispatch(clearError(error))} altText="Clear Error">
              Clear
            </ToastAction>
          ),
        });
      });
    }
  }, [errors]);
  return (
    <div className="flex flex-col justify-center px-4 sm:px-4 lg:px-24 lg:py-4 md:px-12 font-arimo">
      <Header />
      <Outlet />

      <Footer />
      <Toaster />
    </div>
  );
}
