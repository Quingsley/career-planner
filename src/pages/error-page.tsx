import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/custom/footer";
import { Header } from "../components/custom/header";

export function ErrorPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 text-center">
        <div className="max-w-md space-y-4 animate-fade-in">
          <FrownIcon className="mx-auto h-16 w-16 text-gray-500 dark:text-gray-400 animate-bounce" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in-up">Oops! Page not found.</h1>
          <p className="text-gray-500 dark:text-gray-400 animate-fade-in-up">The page you're looking for doesn't exist or has been moved.</p>
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 animate-fade-in-up"
          >
            Go back home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

function FrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
