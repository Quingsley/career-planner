import { useAppSelector } from "../../hooks";
import { BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  const user = useAppSelector(state => state.user);
  return (
    <header className="px-4 lg:px-6 h-14 flex flex-row items-center">
      <Link className="flex items-center justify-center" to="/">
        <BriefcaseIcon />
        <span className="sr-only">Career Planner</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
          About
        </Link>
        {user.userId && (
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/dashboard">
            Dashboard
          </Link>
        )}
        <Link className="text-sm font-medium hover:underline underline-offset-4" to={`${user.userId ? "/auth" : "/"}`}>
          {user.userId ? "LOG OUT" : "Login"}
        </Link>
      </nav>
    </header>
  );
}

// ADD log out functionality
