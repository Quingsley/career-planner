import { Check } from "lucide-react";

type Props = {
  text: string;
  isChecked?: boolean;
  onClick?: () => void;
};

export function Chip(props: Props) {
  const { text, onClick, isChecked } = props;
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer rounded-md ${
        isChecked ? "bg-green-200" : "bg-gray-50"
      }  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}
    >
      {isChecked && <Check className="text-green-500 mr-2" size={14} onClick={onClick} />}
      {text}
    </div>
  );
}
