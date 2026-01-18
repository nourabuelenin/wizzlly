"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  divider?: boolean;
  className?: string;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  triggerClassName?: string;
}

export default function Dropdown({
  trigger,
  items,
  align = "right",
  triggerClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      {/* Toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={triggerClassName}
      >
        {trigger}
      </button>

      {/* Menu */}
      <div
        role="menu"
        className={`
          absolute z-20 w-48 mt-2 py-2 origin-top-right rounded-md shadow-xl
          bg-white dark:bg-gray-800
          transition duration-100 ease-out
          ${align === "right" ? "right-0" : "left-0"}
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
        `}
      >
        {items.map((item, idx) =>
          item.divider ? (
            <hr
              key={idx}
              className="border-gray-200 dark:border-gray-700 my-1"
            />
          ) : (
            <button
              key={idx}
              role="menuitem"
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center px-3 py-3 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white ${
                item.className || ""
              }`}
            >
              {item.icon && <span className="w-5 h-5 mx-1">{item.icon}</span>}
              <span className="mx-1">{item.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
