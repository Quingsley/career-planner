import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import { UserIcon, GraduationCapIcon, BriefcaseIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useAppSelector } from "../../../hooks";
import { useGetProfileQuery } from "../../../store/rtk";
import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks";
import { addProfile } from "../../../store/slices/profile-slice";
import { SkeletonCard } from "./shimmer-card";

export function Profile() {
  const user = useAppSelector(state => state.user);
  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const { isLoading, data } = useGetProfileQuery(user.userId!);

  useEffect(() => {
    if (data) {
      dispatch(addProfile(data));
    }
  }, [data]);
  const currentJob = profile.workExperience.find(job => job.isCurrent);
  const latestEducation = profile.education.sort((a, b) => {
    const endDateYear1 = parseInt(a.endDate.split(", ")[1]);
    const endDateYear2 = parseInt(b.endDate.split(", ")[1]);
    return endDateYear2 - endDateYear1;
  });
  return isLoading ? (
    <SkeletonCard />
  ) : (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <UserIcon className="w-8 h-8" />
        <div className="grid gap-1">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your educational and work background</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {user.fName ? user.fName[0] : "F"}
              {user.lName ? user.lName[0] : "L"}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="font-semibold">
              {user.fName} {user.lName}
            </div>
            {currentJob && <div className="text-sm text-gray-500 dark:text-gray-400">{currentJob.position}</div>}
          </div>
        </div>
        {latestEducation.length > 0 && (
          <div className="flex items-center gap-4">
            <GraduationCapIcon className="w-6 h-6" />
            <div>
              <div className="font-semibold">{latestEducation[0].type.toUpperCase()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{latestEducation[0].course}</div>
            </div>
          </div>
        )}
        {currentJob && (
          <div className="flex items-center gap-4">
            <BriefcaseIcon className="w-6 h-6" />
            <div>
              <div className="font-semibold">{currentJob.position}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentJob.company} {currentJob.startDate} - Present
              </div>
            </div>
          </div>
        )}
        <Button onClick={() => navigation("/profile-setup")} variant="outline" className="justify-self-start">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
