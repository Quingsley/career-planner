import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { UsersIcon } from "lucide-react";

export function CommunityGroups() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <UsersIcon className="w-8 h-8" />
        <div className="grid gap-1">
          <CardTitle>Community Groups</CardTitle>
          <CardDescription>Connect with professionals in your field</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Group" />
          <div>
            <div className="font-semibold">Software Engineers</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Discuss the latest trends and technologies</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Join
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Group" />
          <div>
            <div className="font-semibold">Product Managers</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Share best practices and insights</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Join
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <img src="/placeholder.svg" width="40" height="40" className="rounded-full" alt="Group" />
          <div>
            <div className="font-semibold">UX Designers</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Discuss design trends and best practices</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
