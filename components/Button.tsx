import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  ShowArrow: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

export default function Button({
  text,
  ShowArrow,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isTertiary = variant === "tertiary";

  return (
    <button
      className={`group relative inline-flex cursor-pointer items-center p-4  ${
        ShowArrow ? "pr-16" : ""
      } rounded-full text-xl w-fit overflow-hidden transition-all duration-300 ${
        isPrimary
          ? "bg-white text-black"
          : isSecondary
          ? "bg-primary-secondary text-white"
          : "bg-white text-black"
      } ${className}`}
    >
      {text}
      {ShowArrow && (
        <span
          className={`absolute right-1.5 flex items-center justify-center rounded-full p-3 w-12 h-12 transition-all duration-300 group-hover:w-[calc(100%-0.75rem)] ${
            isPrimary
              ? "bg-primary-secondary text-white"
              : isSecondary
              ? "bg-white text-primary-secondary"
              : "bg-black text-white"
          }`}
        >
          <ArrowRight className="rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
      )}
    </button>
  );
}
