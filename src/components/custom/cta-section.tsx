import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function CallToActionSection() {
  const navigation = useNavigate();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started with Career Planner</h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Sign up now to unlock your career potential and start your journey to a fulfilling and rewarding career.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            {/* <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" /> */}
            <Button className="max-w-lg flex-1" onClick={() => navigation("/auth")}>
              Get Started
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing up, you agree to our
            <Link className="underline underline-offset-2" to="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
