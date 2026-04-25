"use client";

import Link from "next/link";
import { CheckCircle, Zap, Shield } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-down">
          Task<span className="text-emerald-500">Flow</span>
        </span>
        <div className="flex items-center gap-3 animate-fade-down animate-delay-100">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 active:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg transition-colors duration-200">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 transition-all duration-200">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-up">
          Manage tasks with
          <span className="text-emerald-500"> clarity</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 animate-fade-up animate-delay-100">
          TaskFlow helps you organize projects, track progress, and get things done — simply and efficiently.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 text-white font-semibold text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 transition-all duration-200 shadow-lg shadow-emerald-500/25 animate-fade-up animate-delay-200">
          Start for free
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { icon: CheckCircle, title: "Track Progress", desc: "Visual progress bars keep you on top of every project.", delay: "" },
          { icon: Zap, title: "Fast & Efficient", desc: "Optimistic updates make every action feel instant.", delay: "animate-delay-100" },
          { icon: Shield, title: "Secure", desc: "Your data is protected with JWT authentication.", delay: "animate-delay-200" },
        ].map(({ icon: Icon, title, desc, delay }) => (
          <div key={title} className={`reveal ${delay} p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all duration-300`}>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 w-fit mb-4">
              <Icon size={24} className="text-emerald-500" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}