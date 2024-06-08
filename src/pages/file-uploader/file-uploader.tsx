import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router-dom";

import { careerInterests, skills } from "../../common";
import { Chip } from "../../components/custom/chip";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Textarea } from "../../components/ui/textarea";
import { errorHandler } from "../../error";
import { normalizeText } from "../../lib/utils";
import { useCheckResumeMutation, useResumeCareerSuggestionMutation } from "../../store/rtk";

export function FileUploader() {
  const [careerDescription, setCareerDescription] = useState<string>();
  const [selectedCareers, setSelectedCareers] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isValidResume, setIsValidResume] = useState(false);
  const [pickedFile, setPickedFile] = useState<string>();
  const [resume, setResume] = useState<string>();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [checkResume, { isLoading }] = useCheckResumeMutation();
  const [resumeCareerSuggestion, { isLoading: loading }] = useResumeCareerSuggestionMutation();

  const generateResumeSuggestion = async () => {
    if (!resume) return;
    if (!isValidResume) {
      return errorHandler({ message: "Please upload a valid resume/CV" });
    }
    if (selectedCareers.length === 0) {
      return errorHandler({ message: "Please select at least one career interest" });
    }
    if (selectedSkills.length === 0) {
      return errorHandler({ message: "Please select at least one skill" });
    }
    const data = {
      careerInterests: selectedCareers,
      skills: selectedSkills,
      description: careerDescription,
      resume,
    };
    const results = await resumeCareerSuggestion(data);
    if ("data" in results) {
      console.log(results.data);
      navigate("/explore-careers", { state: { data: results.data } });
    } else {
      return errorHandler(results.error);
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPickedFile(file?.name);
    if (file) {
      const pdfText = await pdfToText(file);
      const normalizedText = normalizeText(pdfText);
      console.log(normalizedText);
      const results = await checkResume(normalizedText);
      if ("data" in results) {
        const isResume = results.data;
        console.log(isResume);
        if (!isResume) {
          return errorHandler({ message: "This is not a valid resume/CV, please upload a valid resume/CV" });
        }
        setResume(normalizedText);
        setIsValidResume(true);
      } else {
        return errorHandler(results.error);
      }
    }
    // do something with event data
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onTapCareerHandler = (index: number) => {
    const career = careerInterests[index];
    if (selectedCareers.includes(career)) {
      setSelectedCareers(selectedCareers.filter(item => item !== career));
    } else {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const onTapSelectedSkills = (index: number) => {
    const skill = skills[index];
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(item => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <Card className="w-full  mx-auto mb-10">
      <CardHeader>
        <CardTitle>Upload Your PDF</CardTitle>
        <CardDescription>Drag and drop your CV or resume here, or click to select a file.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors mb-2">
          <CloudUploadIcon className="w-12 h-12 text-gray-500" />
          {pickedFile && <p className="text-gray-500">{pickedFile}</p>}
          {!pickedFile && <p className="text-gray-500">Drag and drop PDF files here, or click to select a file.</p>}
          <Input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
            multiple={false}
            aria-label="Upload file"
            ref={fileInputRef}
          />
          <Button disabled={isLoading} onClick={handleButtonClick} variant="outline">
            {isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
            Select File
          </Button>
        </div>
        <div className="space-y-2 mb-2">
          <Label>Career Interests (Click to select, can be more than one)</Label>
          <ScrollArea className="h-[200px]">
            <div className="flex flex-wrap gap-2">
              {careerInterests.map((interest, index) => (
                <Chip
                  key={index}
                  text={interest}
                  onClick={() => onTapCareerHandler(index)}
                  isChecked={selectedCareers.includes(interest)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-2 mb-2">
          <Label>Skills</Label>
          <ScrollArea className="h-[200px]">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  text={skill}
                  onClick={() => onTapSelectedSkills(index)}
                  isChecked={selectedSkills.includes(skill)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={careerDescription}
            onChange={event => setCareerDescription(event.target.value)}
            rows={3}
            placeholder="Give a description of the career that you would like to transition into"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateResumeSuggestion} disabled={loading || isLoading || !isValidResume}>
          {loading && <Loader2 className="w-6 h-6 animate-spin" />}
          Generate Career Suggestion
        </Button>
      </CardFooter>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
