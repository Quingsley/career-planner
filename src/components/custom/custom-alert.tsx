import { Loader2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  isOpen: boolean;
  title: string;
  description: string | JSX.Element | React.ReactNode;
  onProceed: () => void;
  loading?: boolean;
  buttonTitle?: string;
  onClose: (open: boolean) => void;
};

export function CustomAlert(props: Props) {
  const { onClose, title, description, onProceed, isOpen, loading, buttonTitle } = props;
  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={onProceed}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonTitle || "Proceed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
