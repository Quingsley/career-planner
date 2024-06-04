import { BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex flex-row items-center">
      <Link className="flex items-center justify-center" to="/">
        {/*className="h-6 w-6"   */}
        <BriefcaseIcon />
        <span className="sr-only">Career Planner</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
          Contact
        </Link>
      </nav>
    </header>
  );
}
