import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { BriefcaseIcon } from "lucide-react";

export function JobOpportunities() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <BriefcaseIcon className="w-8 h-8" />
        <div className="grid gap-1">
          <CardTitle>Job Opportunities</CardTitle>
          <CardDescription>Recommended job openings based on your profile</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Company Logo" />
          <div>
            <div className="font-semibold">Software Engineer</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Acme Inc</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Apply
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Company Logo" />
          <div>
            <div className="font-semibold">Product Manager</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Globex Inc</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Apply
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Company Logo" />
          <div>
            <div className="font-semibold">UX Designer</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stark Industries</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
