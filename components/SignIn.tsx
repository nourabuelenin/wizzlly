"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import FormDivider from "@/components/FormDivider";
import authImage from "@/public/images/auth-image.jpg";
import { login } from "@/lib/api/auth";
import { type Locale } from "@/lib/i18n/config";

interface SignInProps {
  onToggleSignUp: () => void;
  onSuccess?: () => void;
  dict: Awaited<ReturnType<typeof import("@/dictionaries").getDictionary>>;
  lang: Locale;
  compact?: boolean;
}

export default function SignIn({
  onToggleSignUp,
  onSuccess,
  dict,
  lang,
  compact = false,
}: SignInProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        toast.success(dict.auth.toast.loginSuccess);

        // If in compact mode (modal), close modal
        if (compact && onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 500);
        } else {
          // If in full page mode, redirect to chat
          router.push(`/${lang}/chat`);
        }
      } else {
        const errorMsg = result.error || dict.auth.toast.loginError;
        setError(errorMsg);
        toast.error(dict.auth.toast.loginError);
      }
    } catch {
      const errorMsg = "An unexpected error occurred";
      setError(errorMsg);
      toast.error(dict.auth.toast.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className={compact ? "mt-4" : ""}>
      <FormInput
        id="username"
        name="username"
        label={dict.auth.signIn.emailLabel}
        type="text"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <PasswordInput
        id="password"
        name="password"
        label={dict.auth.signIn.passwordLabel}
        value={formData.password}
        onChange={handleChange}
        helperText={
          <a
            href="#"
            className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
          >
            {dict.auth.signIn.forgotPassword}
          </a>
        }
        containerClassName="mt-4"
        required
      />

      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? dict.auth.signIn.signingIn : dict.auth.signIn.signInButton}
        </button>
      </div>
    </form>
  );

  if (compact) {
    return (
      <div className="w-full px-6 py-8 md:px-8">
        <div className="flex justify-center mx-auto">
          <Logo />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          {dict.auth.signIn.title}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {renderForm()}

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <button
            onClick={onToggleSignUp}
            className="text-xs text-gray-500 cursor-pointer uppercase dark:text-gray-400 hover:underline"
          >
            {dict.auth.signIn.toggleSignUp}
          </button>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-7xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: `url(${authImage.src})`,
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <Logo />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          {dict.auth.signIn.title}
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-4">
          <GoogleSignInButton text={dict.auth.signIn.googleButton} />
        </div>

        <div className="mt-4">
          <FormDivider text={dict.auth.signIn.emailDivider} />
        </div>

        {renderForm()}

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <button
            onClick={onToggleSignUp}
            className="text-xs text-gray-500 cursor-pointer uppercase dark:text-gray-400 hover:underline"
          >
            {dict.auth.signIn.toggleSignUp}
          </button>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
}