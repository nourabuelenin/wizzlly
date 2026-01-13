import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  ShowArrow: boolean;
}

export default function Button({ text, ShowArrow }: ButtonProps) {
  return (
    <button className="inline-flex gap-5 bg-white text-black p-3 rounded-full text-xl items-center w-fit ">
      {text}
      {ShowArrow && (
        <span className="bg-primary text-white rounded-full p-3">
          <ArrowRight className="rtl:rotate-180" />
        </span>
      )}
    </button>
  );
}
