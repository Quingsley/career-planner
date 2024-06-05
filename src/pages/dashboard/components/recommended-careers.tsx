import { BriefcaseIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { useAppSelector } from "../../../hooks";
import { CareerDetailCard } from "./career-detail-card";

export function RecommendedCareers() {
  const careers = useAppSelector(state => state.career);
  return (
    <Card className="col-span-3 row-span-3">
      <CardHeader className="flex flex-row items-center gap-4">
        <BriefcaseIcon className="w-8 h-8" />
        <div className="grid gap-1">
          <CardTitle>Career Recommendations</CardTitle>
          <CardDescription>Personalized career suggestions based on your profile</CardDescription>
        </div>
      </CardHeader>
      {careers.length === 0 ? (
        <p className="text-center">No Generated Careers yet</p>
      ) : (
        <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {careers.map((career, index) => (
            <CareerDetailCard index={index} data={career} key={index} />
          ))}
        </CardContent>
      )}
    </Card>
  );
}
