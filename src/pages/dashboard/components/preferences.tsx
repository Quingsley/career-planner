import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { GaugeIcon, SignalIcon, TypeIcon, CookieIcon } from "lucide-react";

export function Preferences() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <GaugeIcon className="w-8 h-8" />
        <div className="grid gap-1">
          <CardTitle>Settings</CardTitle>
          <CardDescription>Customize your dashboard and notification preferences</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <SignalIcon className="w-6 h-6" />
          <div>
            <div className="font-semibold">Notification Settings</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Edit
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <TypeIcon className="w-6 h-6" />
          <div>
            <div className="font-semibold">Theme</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Change
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <CookieIcon className="w-6 h-6" />
          <div>
            <div className="font-semibold">Privacy</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Manage your personal data and privacy settings
            </div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
