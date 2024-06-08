import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignInData, UserState, VerificationType } from "../../common";
import { CustomAlert } from "../../components/custom/custom-alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { errorHandler } from "../../error";
import { useAppDispatch } from "../../hooks";
import { useSendCodeMutation, useSignInMutation } from "../../store/rtk";
import { setUser, login } from "../../store/slices/user-slice";
import { useToast } from "../../components/ui/use-toast";
import { InputCode } from "./input-code";
import { ForgotPassword } from "./forgot-password";
import { useNavigate } from "react-router-dom";

export function SignInTab({ errorComponent }: { errorComponent: JSX.Element }) {
  const [signIn, { isLoading }] = useSignInMutation();
  const [sendCode, { isLoading: loading }] = useSendCodeMutation();
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showOTPDialogue, setShowOTPDialogue] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  // not supposed to be here
  const signInHandler: SubmitHandler<SignInData> = async data => {
    const result = await signIn(data);

    if ("data" in result && result.data) {
      const { accessToken, refreshToken } = result.data;
      const data = jwtDecode<Omit<UserState, "refreshToken" | "refreshTknExpTime">>(accessToken);
      const decoded = jwtDecode(refreshToken);
      if (!decoded.exp) return;
      if (!data.isEmailVerified) {
        setUnverifiedEmail(data.email);
        setShowAlert(true);
        return;
      }
      if (!data.exp) return;
      dispatch(
        setUser({
          ...data,
          exp: data.exp * 1000,
          refreshTknExpTime: decoded.exp * 1000,
          refreshToken,
          accessToken,
        }),
        dispatch(login(true)),
      );

      if (!data.isProfileSetup) {
        navigation("/profile-setup");
        return;
      }

      navigation("/dashboard");

      //find a way to clear the inputs

      // redirect to the dashboard
    } else {
      // handle error have a central error handler
      return errorHandler(result.error);
    }
  };

  async function sendVerificationCode() {
    if (unverifiedEmail) {
      const result = await sendCode({ email: unverifiedEmail, type: VerificationType.EMAIL });
      if ("data" in result) {
        toast({
          title: "Verification Code Sent",
          description: "A verification code has been sent to your email",
        });
        setShowAlert(false);
        setShowOTPDialogue(true);
      } else {
        return errorHandler(result.error);
      }
    }
  }
  return (
    <>
      <form key="sign-in" onSubmit={handleSubmit(signInHandler)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className={`${errors.email && "border-red-500"}`}
            id="email"
            placeholder="m@example.com"
            {...register("email", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
            type="email"
          />
          {errors.email && errorComponent}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className={`${errors.password && "border-red-500"}`}
            id="password"
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && errorComponent}
        </div>
        <div className=" flex flex-row space-y-2 mt-4">
          <div className="flex-grow"></div>
          <p
            onClick={() => setForgotPassword(true)}
            className="text-sm font-medium cursor-pointer hover:underline underline-offset-4"
          >
            Forgot Password
          </p>
        </div>
        <Button disabled={isLoading} className="w-full mt-8" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign In
        </Button>
        {showAlert && (
          <CustomAlert
            title="Email Verification Required"
            description="Your email has not been verified, an email will be sent with a code to verify your email"
            onProceed={sendVerificationCode}
            isOpen={showAlert}
            loading={loading}
            onClose={_ => setShowAlert(false)}
          />
        )}
      </form>
      {showOTPDialogue && unverifiedEmail && (
        <InputCode
          email={unverifiedEmail}
          onClose={() => setShowOTPDialogue(false)}
          open={showOTPDialogue}
          type={VerificationType.EMAIL}
        />
      )}
      {forgotPassword && <ForgotPassword open={forgotPassword} onClose={() => setForgotPassword(false)} />}
    </>
  );
}
