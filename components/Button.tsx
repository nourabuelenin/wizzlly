import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary";
  size?: "default" | "nav";
  showArrow?: boolean;
  href?: string;
}

export default function Button({
  text,
  variant = "primary",
  size = "default",
  showArrow = false,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const baseStyles = "group relative inline-flex cursor-pointer items-center justify-center rounded-full w-fit overflow-hidden transition-all duration-300";
  
  const sizeStyles = {
    default: `p-4 text-xl ${showArrow ? "pr-16" : "px-8"}`,
    nav: `py-2 pl-4 pr-12 text-lg`,
  };

  const variantStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-white text-primary hover:bg-surface-muted",
  };

  const arrowStyles = {
    primary: "bg-white text-primary",
    secondary: "bg-primary text-white",
  };

  const arrowSizeStyles = {
    default: "right-1.5 p-3 w-12 h-12 group-hover:w-[calc(100%-0.75rem)]",
    nav: "right-1 p-2 w-8 h-8 group-hover:w-[calc(100%-0.5rem)]",
  };

  const iconSize = size === "default" ? "w-6 h-6" : "w-4 h-4";

  const computedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {text}
      {showArrow && variant === "primary" && (
        <span
          className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${arrowSizeStyles[size]} ${arrowStyles[variant]}`}
        >
          <ArrowRight className={`${iconSize} rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={computedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={computedClassName} {...props}>
      {content}
    </button>
  );
}
