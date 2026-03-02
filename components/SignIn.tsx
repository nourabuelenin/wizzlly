"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthLayout from "@/components/AuthLayout";
import LoginTestimonial from "@/components/LoginTestimonial";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import FacebookSignInButton from "@/components/FacebookSignInButton";
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
  const [rememberMe, setRememberMe] = useState(false);
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

        if (compact && onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 500);
        } else {
          router.push(`/${lang}/dashboard`);
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

  const formContent = (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Log in</h1>
      <p className="text-gray-500 mb-8">{dict.auth.signIn.title || "Welcome back! Please enter your details."}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="username"
          name="username"
          label={dict.auth.signIn.emailLabel || "Email"}
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your email..."
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label={dict.auth.signIn.passwordLabel || "Password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-sm py-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-gray-600 font-medium">Remember for 30 days</span>
          </label>
          <a href="#" className="font-semibold text-gray-900 hover:text-black">
            {dict.auth.signIn.forgotPassword || "Forgot password"}
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold mt-4 transition-colors disabled:opacity-50"
        >
          {isLoading ? dict.auth.signIn.signingIn : (dict.auth.signIn.signInButton || "Log in")}
        </button>

        <div className="pt-2">
          <FacebookSignInButton text="Sign in with Facebook" />
        </div>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          onClick={onToggleSignUp}
          className="text-primary font-semibold hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );

  if (compact) {
    return <div className="px-6 py-8">{formContent}</div>;
  }

  return (
    <AuthLayout rightPanel={<LoginTestimonial />}>
      {formContent}
    </AuthLayout>
  );
}