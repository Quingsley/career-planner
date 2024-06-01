import { Loader2 } from "lucide-react";
import { useState, useRef } from "react";

import { AlertDialog, AlertDialogContent, AlertDialogFooter } from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import { errorHandler } from "../../error";
import { useResetPasswordMutation, useSendCodeMutation, useVerifyEmailMutation } from "../../store/rtk";
import { VerificationType } from "../../common";
import { Input } from "../../components/ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
  type: VerificationType;
};

export function InputCode(props: Props) {
  const { open, email, onClose, type } = props;

  const password = useRef<HTMLInputElement>(null);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: loading }] = useSendCodeMutation();
  const [resetPassword, { isLoading: loading2 }] = useResetPasswordMutation();
  const { toast } = useToast();
  const [value, setValue] = useState<string>();
  const [isError, setIsError] = useState(false);

  const otpHandler = async () => {
    setIsError(false);
    if (value === undefined) {
      setIsError(true);
      return;
    }
    const result = await verifyEmail({ email: email, code: parseInt(value) });
    if ("data" in result && result.data) {
      onClose();
      toast({
        title: "Email Verification",
        description: result.data.message,
      });
    } else {
      //   onClose();
      return errorHandler(result.error);
    }
  };

  const resendVerificationCode = async () => {
    const result = await resendCode({ email, type });
    if ("data" in result) {
      toast({
        title: "Resend Code",
        description: result.data,
      });
    } else {
      return errorHandler(result.error);
    }
  };

  const resetPasswordHandler = async () => {
    setIsError(false);
    if (value === undefined) {
      setIsError(true);
      return;
    }
    if (!password.current?.value) return toast({ title: "Password Reset", description: "Password is required", variant: "destructive" });
    const result = await resetPassword({ email, code: parseInt(value), newPassword: password.current?.value });
    if ("data" in result && result.data) {
      onClose();
      toast({
        title: "Password Reset",
        description: result.data.message,
      });
    } else {
      return errorHandler(result.error);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        {type === VerificationType.PASSWORD && (
          <div className="space-y-2">
            <Label htmlFor="email">New Password</Label>
            <Input
              onChange={event => {
                if (password.current) {
                  password.current.value = event.target.value;
                }
              }}
              id="password"
              ref={password}
              type="password"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="verification-code">Verification Code</Label>
          <InputOTP maxLength={6} pattern="^[0-9]+$" value={value} onChange={value => setValue(value)}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={index} className={`${isError && "border-rose-500"}`} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please enter the one-time code sent to your email,The code will expire in 10 minutes
          </p>
        </div>
        <AlertDialogFooter>
          <Button onClick={resendVerificationCode} variant="outline">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Resend code
          </Button>
          <Button onClick={type === VerificationType.EMAIL ? otpHandler : resetPasswordHandler} disabled={isLoading || loading2}>
            {(isLoading || loading2) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            {type === VerificationType.EMAIL ? "Verify Email" : "Update Password"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
