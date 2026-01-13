import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  ShowArrow: boolean;
}

export default function Button({ text, ShowArrow }: ButtonProps) {
  return (
    <button className="group relative inline-flex cursor-pointer items-center bg-white text-black p-4 pr-16 rounded-full text-xl w-fit overflow-hidden transition-all duration-300">
      {text}
      {ShowArrow && (
        <span className="absolute right-1.5 flex items-center justify-center bg-primary text-white rounded-full p-3 w-12 h-12 transition-all duration-300 group-hover:w-[calc(100%-0.75rem)]">
          <ArrowRight className="rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
      )}
    </button>
  );
}
