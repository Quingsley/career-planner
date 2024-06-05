export interface UserState {
  email: string | undefined;
  fName: string | undefined;
  lName: string | undefined;
  accessToken: string | undefined;
  exp: number | undefined;
  userId: string | undefined;
  refreshToken: string | undefined;
  isEmailVerified: boolean | undefined;
  isProfileSetup: boolean | undefined;
  refreshTknExpTime: number | undefined;
}

export interface SignUpData {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export type SignInData = Omit<SignUpData, "fName" | "lName">;

export interface HttpErrorRes {
  error: {
    message: string;
  };
}

export enum VerificationType {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface ProfileDataState {
  _id?: string;
  description?: string;
  userId?: string;
  skills: string[];
  careerInterests: string[];
  education: EducationData[];
  workExperience: Work[];
}

export interface EducationData {
  isCurrent: boolean;
  startDate: string;
  endDate: string;
  course: string;
  type: string;
  school: string;
  _id: string;
}

export interface Work {
  isCurrent: boolean;
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  _id: string;
}

export interface CareerDetails {
  jobTitle: string;
  jobDescription: string;
  timeline: string;
  salaryRange: string;
  difficulty: string;
}

export interface RoadMapResponse {
  workRequired: string;
  reasonItsAGoodFit: string[];
  aboutTheRole: string;
  roadmap: Array<Record<string, string>>;
}
