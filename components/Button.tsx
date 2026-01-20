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
      className={`group relative inline-flex cursor-pointer items-center justify-center md:justify-start p-3 md:p-4 ${
        ShowArrow ? "pr-16 md:pr-20" : ""
      } rounded-full text-sm md:text-lg lg:text-xl w-fit overflow-hidden transition-all duration-300 ${
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
          className={`absolute right-1.5 md:right-2 flex items-center justify-center rounded-full p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:w-[calc(100%-0.75rem)] ${
            isPrimary
              ? "bg-primary-secondary text-white"
              : isSecondary
                ? "bg-white text-primary-secondary"
                : "bg-black text-white"
          }`}
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
      )}
    </button>
  );
}
