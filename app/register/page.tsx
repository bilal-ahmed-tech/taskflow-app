"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const passwordStrength = passwordRules.filter((r) => r.test(form.password)).length;

  const strengthLabel =
    passwordStrength <= 1
      ? "Very weak"
      : passwordStrength === 2
      ? "Weak"
      : passwordStrength === 3
      ? "Fair"
      : passwordStrength === 4
      ? "Strong"
      : "Very strong";

  const strengthColor =
    passwordStrength <= 1
      ? "bg-red-500"
      : passwordStrength === 2
      ? "bg-orange-500"
      : passwordStrength === 3
      ? "bg-amber-500"
      : passwordStrength === 4
      ? "bg-emerald-400"
      : "bg-emerald-500";

  const errors = {
    name:
      touched.name && !form.name.trim()
        ? "Full name is required"
        : touched.name && form.name.trim().length < 2
        ? "Name must be at least 2 characters"
        : "",
    email:
      touched.email && !form.email
        ? "Email is required"
        : touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "Enter a valid email address"
        : "",
    password:
      touched.password && !form.password
        ? "Password is required"
        : touched.password && passwordStrength < 5
        ? "Password does not meet all requirements"
        : "",
  };

  const isValid =
    !errors.name &&
    !errors.email &&
    !errors.password &&
    form.name.trim() &&
    form.email &&
    form.password &&
    passwordStrength === 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">
            Task<span className="text-emerald-500">Flow</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start managing your tasks for free
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Bilal Ahmed"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={`w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-emerald-500 transition-all duration-200
                  ${
                    errors.name
                      ? "border border-red-400 dark:border-red-500 focus-visible:ring-red-500"
                      : "border border-gray-200 dark:border-gray-700 focus-visible:ring-emerald-500"
                  }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 dark:text-red-400">{errors.name}</p>
              )}
            </div>

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
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  onFocus={() => setShowRules(true)}
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

              {/* Strength bar */}
              {showRules && form.password && (
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength
                          ? strengthColor
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              )}
              {showRules && form.password && (
                <p
                  className={`text-xs font-medium ${
                    passwordStrength <= 2
                      ? "text-red-500"
                      : passwordStrength === 3
                      ? "text-amber-500"
                      : "text-emerald-500"
                  }`}>
                  {strengthLabel}
                </p>
              )}

              {/* Rules checklist */}
              {showRules && (
                <div className="flex flex-col gap-1 mt-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(form.password);
                    return (
                      <div key={rule.label} className="flex items-center gap-2">
                        {passed ? (
                          <CheckCircle2
                            size={13}
                            className="text-emerald-500 shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={13}
                            className="text-gray-300 dark:text-gray-600 shrink-0"
                          />
                        )}
                        <span
                          className={`text-xs transition-colors duration-200 ${
                            passed
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}>
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-2">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-500 hover:text-emerald-400 active:text-emerald-600 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}