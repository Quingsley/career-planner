import { CommunityGroups } from "./components/community-groups";
import { JobOpportunities } from "./components/job-oppotunites";
// import { Preferences } from "./components/preferences";
import { Profile } from "./components/profile";
import { RecommendedCareers } from "./components/recommended-careers";

export function DashBoard() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RecommendedCareers />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobOpportunities />
            <CommunityGroups />
            {/* <Preferences /> */}
            <Profile />
          </div>
        </div>
      </main>
    </div>
  );
}
