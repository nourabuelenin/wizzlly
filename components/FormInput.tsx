import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: React.ReactNode;
  containerClassName?: string;
}

export default function FormInput({
  label,
  error,
  helperText,
  id,
  className = "",
  containerClassName = "",
  ...props
}: FormInputProps) {
  return (
    <div className={containerClassName}>
      <div className="flex justify-between mb-2">
        <label
          className="block text-sm font-medium text-gray-600 dark:text-gray-200"
          htmlFor={id}
        >
          {label}
        </label>
        {helperText && helperText}
      </div>
      <input
        id={id}
        className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
