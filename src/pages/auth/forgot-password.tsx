import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

import { AlertDialog, AlertDialogContent } from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useForgotPasswordMutation } from "../../store/rtk";
import { errorHandler } from "../../error";
import { useToast } from "../../components/ui/use-toast";
import { InputCode } from "./input-code";
import { VerificationType } from "../../common";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ForgotPassword(props: Props) {
  const { open, onClose } = props;
  const [showOtp, setShowOtp] = useState(false);
  const [forgottenEmail, setForgottenEmail] = useState<string>();
  const email = useRef<HTMLInputElement>(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { toast } = useToast();
  console.log(email.current?.value);
  const handler = async () => {
    if (email.current?.value) {
      const result = await forgotPassword({ email: email.current.value });
      setForgottenEmail(email.current.value);
      if ("data" in result && result.data) {
        // onClose();
        toast({
          title: "Forgot Password",
          description: result.data.message,
        });
        setShowOtp(true);
      } else {
        return errorHandler(result.error);
      }
    }
  };
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={event => {
                if (!validate(event.target.value)) {
                  email.current?.focus();
                }
              }}
              className={`${email.current && "border-red-500"}`}
              id="email"
              placeholder="m@example.com"
              ref={email}
              type="email"
            />
          </div>
          <Button onClick={handler} className="w-full mt-8">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Continue
          </Button>
        </AlertDialogContent>
      </AlertDialog>
      {showOtp && forgottenEmail && (
        <InputCode
          open={showOtp}
          onClose={() => {
            onClose();
            setShowOtp(false);
          }}
          email={forgottenEmail}
          type={VerificationType.PASSWORD}
        />
      )}
    </>
  );
}

///^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

function validate(email: string) {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
}
