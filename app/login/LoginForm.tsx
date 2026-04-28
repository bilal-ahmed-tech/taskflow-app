"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const errors = {
    email:
      touched.email && !form.email
        ? "Email is required"
        : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "Enter a valid email address"
        : "",
    password:
      touched.password && !form.password
        ? "Password is required"
        : "",
  };

  const isValid =
    !errors.email &&
    !errors.password &&
    form.email &&
    form.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
      {registered && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-sm text-emerald-600 dark:text-emerald-400">
          Account created! Sign in to continue.
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="bilal@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-emerald-500 transition-all duration-200
              ${
                errors.email
                  ? "border border-red-400 dark:border-red-500 focus-visible:ring-red-500"
                  : "border border-gray-200 dark:border-gray-700 focus-visible:ring-emerald-500"
              }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              className={`w-full px-4 py-2.5 pr-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-emerald-500 transition-all duration-200
                ${
                  errors.password
                    ? "border border-red-400 dark:border-red-500 focus-visible:ring-red-500"
                    : "border border-gray-200 dark:border-gray-700 focus-visible:ring-emerald-500"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-all duration-200"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 dark:text-red-400">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}