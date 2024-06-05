import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { careerInterests, ProfileDataState, skills } from "../../common";
import { Chip } from "../../components/custom/chip";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";
import { errorHandler } from "../../error";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCreateProfileMutation, useUpdateProfileMutation } from "../../store/rtk";
import { addSelectedCareers, addSelectedSkills, setDescription, setId } from "../../store/slices/profile-slice";

export function SkillSetInterest() {
  const { careerInterests: crI, skills: skls } = useAppSelector(state => state.profile); // used when updating
  const [selectedCareers, setSelectedCareers] = useState<string[]>(crI);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(skls);
  const [careerDescription, setCareerDescription] = useState<string>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const profile = useAppSelector(state => state.profile);
  const user = useAppSelector(state => state.user);
  const navigation = useNavigate();
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: loading }] = useUpdateProfileMutation();

  const profileHandler = async () => {
    dispatch(setDescription(careerDescription));

    if (selectedCareers.length === 0 || selectedSkills.length === 0) {
      toast({
        title: "Error",
        description: "Please Provide at least one career interest and at least one skill",
        variant: "destructive",
      });
      return;
    }

    dispatch(addSelectedCareers(selectedCareers));
    dispatch(addSelectedSkills(selectedSkills));

    const data: ProfileDataState = {
      ...profile,
      careerInterests: selectedCareers,
      skills: selectedSkills,
      description: careerDescription,
      userId: user.userId,
    };
    if (!profile._id && !profile.userId) {
      // create
      const result = await createProfile(data);
      if ("data" in result && result.data) {
        const { data } = result;
        if (data._id) dispatch(setId({ _id: data._id, userId: user.userId! }));

        toast({ title: "Success", description: "Profile created successfully" });
        navigation("/dashboard");
      } else {
        return errorHandler(result.error);
      }
    } else {
      // update
      const result = await updateProfile(data);
      if ("data" in result && result.data) {
        toast({ title: "Success", description: "Profile updated successfully\n You can generate new careers!" });
        // navigation("/dashboard");
      } else {
        return errorHandler(result.error);
      }
    }
    setDescription("");
    setSelectedCareers([]);
    setSelectedSkills([]);
  };

  const onTapCareerHandler = (index: number) => {
    const selectedIndex = selectedCareers.indexOf(careerInterests[index]);
    if (selectedIndex === -1) {
      setSelectedCareers(prev => [...prev, careerInterests[index]]);
    } else {
      setSelectedCareers(prev => prev.filter((_, i) => i !== selectedIndex));
    }
  };

  const onTapSelectedSkills = (index: number) => {
    const selectedIndex = selectedSkills.indexOf(skills[index]);
    if (selectedIndex === -1) {
      setSelectedSkills(prev => [...prev, skills[index]]);
    } else {
      setSelectedSkills(prev => prev.filter((_, i) => i !== selectedIndex));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Career Interests (Click to select, can be more than one)</Label>
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
      </div>
      <div className="space-y-2">
        <Label>Skills</Label>
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
      <Button disabled={isLoading || loading} onClick={profileHandler}>
        {(isLoading || loading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-1" /> {profile._id && profile.userId ? "Update Profile" : "Save Profile"}
      </Button>
    </div>
  );
}
