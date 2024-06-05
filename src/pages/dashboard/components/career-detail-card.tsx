import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { CareerDetails, RoadMapResponse } from "../../../common";
import { Badge } from "../../../components/ui/badge";
import { useAppDispatch } from "../../../hooks";
import { deleteCareer } from "../../../store/slices/career-slice";
import { CustomAlert } from "../../../components/custom/custom-alert";
import { useRoadmapSuggestionMutation } from "../../../store/rtk";
import { errorHandler } from "../../../error";
import { RoadMapDialog } from "./roadmap-dialog";

export function CareerDetailCard(props: { data: CareerDetails; index: number }) {
  const { difficulty, jobDescription, jobTitle, salaryRange, timeline } = props.data;
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState<RoadMapResponse>();
  const dispatch = useAppDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [roadmapSuggestion, { isLoading }] = useRoadmapSuggestionMutation();

  const onDeleteHandler = (index: number) => {
    dispatch(deleteCareer(index));
    setShowDialog(false);
  };

  const roadmapSuggestionHandler = async () => {
    const response = await roadmapSuggestion(props.data);
    if ("data" in response) {
      setRoadmapData(response.data);
      setShowRoadmap(true);
    } else {
      return errorHandler(response.error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>{jobTitle}</CardTitle>
        <CardDescription>{jobDescription}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium">Salary Range</p>
            <p className="text-gray-500 dark:text-gray-400">{salaryRange}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium">Training Timeline</p>
            <p className="text-gray-500 dark:text-gray-400">{timeline}</p>
          </div>
        </div>
        <div className="grid gap-1">
          <p className="text-sm font-medium">Difficulty Level</p>
          <Badge variant="secondary" className="w-16 text-center">
            {difficulty}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button onClick={roadmapSuggestionHandler} disabled={isLoading}>
          <Sparkles size={12} className={`${isLoading && "animate-spin"} mr-1`} />
          View Roadmap
        </Button>
        <Button onClick={() => setShowDialog(true)} className="ml-1" variant="outline">
          Delete Career
        </Button>
      </CardFooter>
      {showDialog && (
        <CustomAlert
          isOpen={showDialog}
          title="Delete Generated Career"
          description="Are you sure you want to delete the generated career"
          onProceed={() => onDeleteHandler(props.index)}
          buttonTitle="Delete"
          onClose={() => setShowDialog(false)}
        />
      )}
      {showRoadmap && roadmapData && (
        <RoadMapDialog role={jobTitle} data={roadmapData} isOpen={showRoadmap} onClose={() => setShowRoadmap(false)} />
      )}
    </Card>
  );
}
