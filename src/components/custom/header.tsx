import { BriefcaseIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { Button } from "../ui/button";

export function Header() {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch({ type: "CLEAR_APP" });
    navigate("/");
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex flex-row items-center">
      <Link className="flex items-center justify-center" to="/">
        <BriefcaseIcon />
        <span className="sr-only">Career Planner</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* <Link className="text-sm font-medium hover:underline underline-offset-4" to="/#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
          About
        </Link> */}
        {user.userId && (
          <Button
            onClick={() => navigate("/dashboard")}
            variant="link"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Button>
        )}
        <Button
          onClick={logoutHandler}
          className="text-sm font-medium hover:underline underline-offset-4"
          variant="link"
        >
          {user.userId ? "LOG OUT" : "Login"}
        </Button>
      </nav>
    </header>
  );
}

// ADD log out functionality
