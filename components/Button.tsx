import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
}

export default function Button({
  text,
  variant = "primary",
  showArrow = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex cursor-pointer items-center justify-center p-4 rounded-full text-xl w-fit overflow-hidden transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-white text-primary hover:bg-surface-muted",
  };

  const arrowStyles = {
    primary: "bg-white text-primary",
    secondary: "bg-primary text-white", // Fallback if arrow is forced on secondary
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        showArrow ? "pr-16" : "px-8"
      } ${className}`}
      {...props}
    >
      {text}
      {showArrow && variant === "primary" && (
        <span
          className={`absolute right-1.5 flex items-center justify-center rounded-full p-3 w-12 h-12 transition-all duration-300 group-hover:w-[calc(100%-0.75rem)] ${arrowStyles[variant]}`}
        >
          <ArrowRight className="rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </span>
      )}
    </button>
  );
}
