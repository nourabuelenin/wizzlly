"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // Close on Escape (accessibility)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        {/* Panel */}
        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 w-full max-w-md animate-[modalIn_0.25s_ease-out]">
          {title && (
            <h3
              id="modal-title"
              className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
            >
              {title}
            </h3>
          )}

          <div className={title ? "mt-4" : ""}>{children}</div>
        </div>
      </div>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(1rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
