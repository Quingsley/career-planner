export interface UserState {
  email: string | undefined;
  fName: string | undefined;
  lName: string | undefined;
  accessToken: string | undefined;
  exp: number | undefined;
  userId: string | undefined;
  refreshToken: string | undefined;
  isEmailVerified: boolean | undefined;
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
