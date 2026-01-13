import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  ShowArrow: boolean;
}

export default function Button({ text, ShowArrow }: ButtonProps) {
  return (
    <button className="inline-flex cursor-pointer gap-5 bg-white text-black p-3 rounded-full text-xl items-center w-fit transition-all duration-300 hover:scale-105 hover:shadow-lg">
      {text}
      {ShowArrow && (
        <span className="bg-primary text-white rounded-full p-3 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="rtl:rotate-180" />
        </span>
      )}
    </button>
  );
}
