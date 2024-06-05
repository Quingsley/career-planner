import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Education } from "./education";
import { SkillSetInterest } from "./skill-set-interest";
import { WorkExperience } from "./work-experience";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useToast } from "../../components/ui/use-toast";
import { useCareerSuggestionMutation } from "../../store/rtk";
import { errorHandler } from "../../error";
import { addCareer } from "../../store/slices/career-slice";

enum ProfileTabs {
  Education = "education",
  Experience = "experience",
  Interests = "interests",
}

export function ProfileSetUp() {
  const [activeTab, setActiveTab] = useState<ProfileTabs>(ProfileTabs.Education);
  const education = useAppSelector(state => state.profile.education);
  const profile = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [careerSuggestion, { isLoading }] = useCareerSuggestionMutation();
  const { toast } = useToast();

  const careerSuggestionHandler = async () => {
    const profileId = profile._id;
    if (!profileId) {
      toast({
        title: "Profile not found",
        description: "Please complete your profile setup",
        variant: "destructive",
      });
      return;
    }
    const result = await careerSuggestion({ profileId });
    if ("data" in result) {
      console.log(result.data);
      if (result.data) dispatch(addCareer(result.data));
    } else {
      return errorHandler(result.error);
    }
  };

  function onTabChange(value: string) {
    if (activeTab === ProfileTabs.Education) {
      if (education.length === 0) {
        toast({
          title: "No education added",
          description: "Please add your education details",
          variant: "destructive",
        });
        return;
      }
    }
    if (value === ProfileTabs.Education) {
      setActiveTab(ProfileTabs.Education);
    } else if (value === ProfileTabs.Experience) {
      setActiveTab(ProfileTabs.Experience);
    } else {
      setActiveTab(ProfileTabs.Interests);
    }
  }
  const handleNextClick = () => {
    if (activeTab === ProfileTabs.Education) {
      if (education.length === 0) {
        toast({
          title: "No education added",
          description: "Please add your education details",
          variant: "destructive",
        });
        return;
      }

      setActiveTab(ProfileTabs.Experience);
    } else if (activeTab === ProfileTabs.Experience) {
      setActiveTab(ProfileTabs.Interests);
    } else {
      setActiveTab(ProfileTabs.Education);
    }
  };
  const handlePreviousClick = () => {
    if (activeTab === "experience") {
      setActiveTab(ProfileTabs.Education);
    } else if (activeTab === ProfileTabs.Interests) {
      setActiveTab(ProfileTabs.Experience);
    } else {
      setActiveTab(ProfileTabs.Interests);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0 mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Education, Experience, & Interests</h1>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handlePreviousClick}>
            Previous
          </Button>

          <Button
            disabled={isLoading}
            onClick={activeTab === ProfileTabs.Interests ? careerSuggestionHandler : handleNextClick}
          >
            {activeTab === ProfileTabs.Interests && <Sparkles className={`mr-1 ${isLoading && "animate-spin"}`} />}
            {activeTab === ProfileTabs.Interests ? "Generate Careers" : "Next"}
          </Button>
        </div>
      </div>
      <Tabs defaultValue={activeTab} value={activeTab} className="w-full" onValueChange={onTabChange}>
        <TabsList className="flex gap-4 mb-6">
          <TabsTrigger value={ProfileTabs.Education}>Education</TabsTrigger>
          <TabsTrigger value={ProfileTabs.Experience}>Experience</TabsTrigger>
          <TabsTrigger value={ProfileTabs.Interests}>Interests & Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="education" className="animate-fade-in">
          <Education />
        </TabsContent>
        <TabsContent value="experience" className="animate-fade-in">
          <WorkExperience />
        </TabsContent>
        <TabsContent value="interests" className="animate-fade-in">
          <SkillSetInterest />
        </TabsContent>
      </Tabs>
    </div>
  );
}
