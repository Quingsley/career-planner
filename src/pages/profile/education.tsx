import { useState } from "react";
import { CirclePlus } from "lucide-react";

import { EducationData, generateYears, months, universitiesInKenya } from "../../common";
import { coursesInKenyanUniversities } from "../../common/courses";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useToast } from "../../components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addEducation, deleteEducation } from "../../store/slices/profile-slice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

const initialState: EducationData = {
  school: "",
  course: "",
  type: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  _id: "",
};
export function Education() {
  const education = useAppSelector(state => state.profile.education);
  const [currentEducation, setCurrentEducation] = useState(false);
  const [formValues, setFormValues] = useState<EducationData>(initialState);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const addEducationHandler = () => {
    setFormValues(prev => ({ ...prev, isCurrent: currentEducation }));

    const values = Object.values(formValues);
    const isAnyEmpty = values.some(value => value === "");
    if (isAnyEmpty) {
      toast({
        title: "Validation failed",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // validate start and end date
    const startDate = formValues.startDate.split(", ")[1];
    const endDate = formValues.endDate.split(", ")[1];
    if (parseInt(startDate) > parseInt(endDate)) {
      toast({
        title: "Validation failed",
        description: "Start date cannot be greater than end date",
        variant: "destructive",
      });
      return;
    }

    dispatch(addEducation(formValues));
    setFormValues(initialState);
    setCurrentEducation(false);
  };

  return (
    <div className="space-y-6">
      {education.length > 0 &&
        education.map((edu, index) => (
          <Card key={index} className="shadow">
            <CardHeader>
              <CardTitle>{edu.school}</CardTitle>
              <CardDescription>{edu.course}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{edu.type}</p>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => dispatch(deleteEducation(index))}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Select
            value={formValues.school}
            onValueChange={value => setFormValues(prev => ({ ...prev, school: value }))}
          >
            <SelectTrigger id="school">
              <SelectValue placeholder="Select school" />
            </SelectTrigger>
            <SelectContent>
              {universitiesInKenya.map((uni, index) => (
                <SelectItem key={index} value={uni}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course of Study</Label>
          <Select
            value={formValues.course}
            onValueChange={value => setFormValues(prev => ({ ...prev, course: value }))}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {coursesInKenyanUniversities.map((course, index) => (
                <SelectItem key={index} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Select value={formValues.type} onValueChange={value => setFormValues(prev => ({ ...prev, type: value }))}>
            <SelectTrigger id="degree">
              <SelectValue placeholder="Select degree type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="masters">Masters</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formValues.startDate.split(", ")[0]}
                onValueChange={value => setFormValues(prev => ({ ...prev, startDate: value }))}
              >
                <SelectTrigger id="start-month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formValues.startDate.split(", ")[1]}
                onValueChange={value =>
                  setFormValues(prev => ({
                    ...prev,
                    startDate: `${prev.startDate}, ${value}`,
                  }))
                }
              >
                <SelectTrigger id="start-year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {generateYears().map((year, index) => (
                    <SelectItem key={index} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formValues.endDate.split(", ")[0]}
                onValueChange={value => setFormValues(prev => ({ ...prev, endDate: value }))}
              >
                <SelectTrigger id="end-month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formValues.endDate.split(", ")[1]}
                onValueChange={value =>
                  setFormValues(prev => ({
                    ...prev,
                    endDate: `${prev.endDate}, ${value}`,
                  }))
                }
              >
                <SelectTrigger id="end-year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {generateYears().map((year, index) => (
                    <SelectItem key={index} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-y-2">
        <Checkbox id="current" checked={currentEducation} onCheckedChange={_ => setCurrentEducation(prev => !prev)} />
        <Label
          className="ml-2 text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="current"
        >
          Currently attending
        </Label>
      </div>
      <Button onClick={addEducationHandler}>
        {" "}
        <CirclePlus className="mr-1" /> Save
      </Button>
    </div>
  );
}

// months not clearing
