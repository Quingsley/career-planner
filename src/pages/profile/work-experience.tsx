import { CirclePlus } from "lucide-react";
import { useState } from "react";

import { generateYears, months, Work } from "../../common";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useToast } from "../../components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addWork, deleteWork } from "../../store/slices/profile-slice";

const initialState: Work = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
};

export function WorkExperience() {
  const [formValues, setFormValues] = useState<Work>(initialState);
  const [currentWork, setCurrentWork] = useState(false);
  const workExperience = useAppSelector(state => state.profile.workExperience);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const addWorkHandler = () => {
    setFormValues(prev => ({ ...prev, isCurrent: currentWork }));

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

    dispatch(addWork(formValues));
    setFormValues(initialState);
  };
  return (
    <div className="space-y-6">
      {workExperience.length > 0 &&
        workExperience.map((work, index) => (
          <Card key={index} className="shadow">
            <CardHeader>
              <CardTitle>{work.company}</CardTitle>
              <CardDescription>{work.position}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {work.startDate} - {work.endDate}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => dispatch(deleteWork(index))}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      <div className="space-y-2">
        <Label htmlFor="job-company">Company</Label>
        <Input
          onChange={event => setFormValues(prev => ({ ...prev, company: event.target.value }))}
          value={formValues.company}
          id="job-company"
          placeholder="Enter Company Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="job-title">Job Title</Label>
        <Input
          onChange={event => setFormValues(prev => ({ ...prev, position: event.target.value }))}
          value={formValues.position}
          id="job-title"
          placeholder="Enter job title"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              onValueChange={value => setFormValues(prev => ({ ...prev, startDate: value }))}
              value={formValues.startDate.split(", ")[0]}
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
              onValueChange={value => setFormValues(prev => ({ ...prev, startDate: `${prev.startDate}, ${value}` }))}
              value={formValues.startDate.split(", ")[1]}
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
              onValueChange={value => setFormValues(prev => ({ ...prev, endDate: value }))}
              value={formValues.endDate.split(", ")[0]}
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
              onValueChange={value => setFormValues(prev => ({ ...prev, endDate: `${prev.endDate}, ${value}` }))}
              value={formValues.endDate.split(", ")[1]}
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
      <div className="flex items-center space-y-2">
        <Checkbox id="current" checked={currentWork} onCheckedChange={_ => setCurrentWork(prev => !prev)} />
        <Label
          className="ml-2 text-sm font-medium text-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="current"
        >
          Current Job
        </Label>
      </div>
      <Button onClick={addWorkHandler}>
        <CirclePlus className="mr-1" />
        Save
      </Button>
    </div>
  );
}
