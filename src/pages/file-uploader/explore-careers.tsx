import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

import { CareerDetails, RoadMapResponse } from "../../common";
import { Button } from "../../components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { usePublicRoadmapSuggestionMutation } from "../../store/rtk";
import { errorHandler } from "../../error";
import { RoadMapDialog } from "../dashboard/components/roadmap-dialog";
import { Badge } from "../../components/ui/badge";

export function EXploreCareers() {
  // get data from the previous page
  const location = useLocation();
  const data: CareerDetails[] = location.state?.data;
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState<RoadMapResponse>();
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const [roadmapSuggestion, { isLoading }] = usePublicRoadmapSuggestionMutation();
  const roadmapSuggestionHandler = async (data: CareerDetails) => {
    setSelectedTitle(data.jobTitle);
    const response = await roadmapSuggestion(data);
    if ("data" in response) {
      setRoadmapData(response.data);
      setShowRoadmap(true);
    } else {
      return errorHandler(response.error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-4">
        {data &&
          data.length > 0 &&
          data.map((career, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-950 dark:text-gray-50 transform transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <CardTitle>{career.jobTitle}</CardTitle>
                <CardDescription>{career.jobDescription}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">Salary Range</p>
                    <p className="text-gray-500 dark:text-gray-400">{career.salaryRange}</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">Training Timeline</p>
                    <p className="text-gray-500 dark:text-gray-400">{career.timeline}</p>
                  </div>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Difficulty Level</p>
                  <Badge variant="secondary" className="w-16 text-center">
                    {career.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button key={index} onClick={() => roadmapSuggestionHandler(career)} disabled={isLoading}>
                  <Sparkles size={12} className={`${isLoading && "animate-spin"}`} />
                  View Roadmap
                </Button>
              </CardFooter>
            </div>
          ))}
      </div>
      {showRoadmap && roadmapData && (
        <RoadMapDialog
          role={selectedTitle}
          data={roadmapData}
          isOpen={showRoadmap}
          onClose={() => setShowRoadmap(false)}
        />
      )}
    </>
  );
}
