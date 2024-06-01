import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpData, VerificationType } from "../../common";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { errorHandler } from "../../error";
import { useSignUpMutation } from "../../store/rtk";
import { InputCode } from "./input-code";
import { SignInTab } from "./sign-in";

enum TabsEnum {
  signUp = "signUp",
  signIn = "signIn",
}

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const [showOtp, setShowOtp] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>();
  const [signUp, { isLoading }] = useSignUpMutation();

  const signUpHandler: SubmitHandler<SignUpData> = async data => {
    const result = await signUp(data);
    if ("data" in result) {
      setUnverifiedEmail(data.email);
      console.log(result.data);
      setShowOtp(true);
    } else {
      return errorHandler(result.error);
    }
  };

  // console.log(watch("fName"));
  const errorComponent = (
    <span role="alert" className="text-xs text-red-500 text-end">
      This field is required
    </span>
  );
  return (
    <div className="mx-auto max-w-md space-y-6 mb-48">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Career Planner</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to get started</p>
      </div>
      <div className="space-y-4">
        <Tabs defaultValue={TabsEnum.signUp}>
          <TabsList>
            <TabsTrigger value={TabsEnum.signUp}>Sign Up</TabsTrigger>
            <TabsTrigger value={TabsEnum.signIn}>Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value={TabsEnum.signUp}>
            <form onSubmit={handleSubmit(signUpHandler)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    className={`${errors.fName && "border-red-500 focus:border-red-500"}`}
                    id="first-name"
                    placeholder="John"
                    {...register("fName", { required: true })}
                  />
                  {errors.fName && errorComponent}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    className={`${errors.lName && "border-red-500"}`}
                    id="last-name"
                    placeholder="Doe"
                    {...register("lName", { required: true })}
                  />
                  {errors.lName && errorComponent}
                </div>
              </div>
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
                  {...register("password", { required: true, minLength: 8 })}
                  type="password"
                />
                {errors.password && errorComponent}
              </div>
              <Button disabled={isLoading} className="w-full mt-8" type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Get Started
              </Button>
              {showOtp && unverifiedEmail && (
                <InputCode onClose={() => setShowOtp(false)} open={showOtp} type={VerificationType.EMAIL} email={unverifiedEmail} />
              )}
            </form>
          </TabsContent>
          <TabsContent value={TabsEnum.signIn}>
            <SignInTab errorComponent={errorComponent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
