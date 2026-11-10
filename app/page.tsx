"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faFileLines,
  faChartLine,
  faBullseye,
  faBrain,
  faCheckCircle,
  faBriefcase,
  faRocket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: faBullseye,
      title: "Job Match Score",
      description:
        "Discover how closely your resume matches a job description with an AI-powered match score.",
    },
    {
      icon: faBrain,
      title: "AI Skill Analysis",
      description:
        "Identify your missing skills and understand which areas need improvement.",
    },
    {
      icon: faFileLines,
      title: "Preparation Plan",
      description:
        "Get a personalized preparation roadmap based on your skill gaps.",
    },
    {
      icon: faChartLine,
      title: "Technical Questions",
      description:
        "Prepare for interviews with technical questions and detailed answers.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-white">

      {/* NAVBAR */}
      <nav className="relative z-20 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>

            <span className="text-xl font-bold tracking-tight text-[#111827]">
              Job Fit <span className="text-[#1D4ED8]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition hover:text-blue-700"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition hover:text-blue-700"
            >
              How It Works
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-600"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-600"
              >
                How It Works
              </a>

              <Link
                href="/login"
                className="rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-[#1D4ED8] py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/80 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:px-12">

          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <FontAwesomeIcon icon={faBrain} />
              AI-Powered Career Assistant
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Find Out How Well You
              <span className="text-[#1D4ED8]"> Fit Your Dream Job.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#64748B] sm:text-lg">
              Stop guessing whether you're qualified for a job.
              Upload your resume, analyze job requirements, identify
              skill gaps, and get a personalized preparation plan
              powered by AI.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#1D4ED8] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-800"
              >
                Analyze Your Job Fit
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                I Already Have an Account
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {[
                "AI-Powered Analysis",
                "Personalized Roadmap",
                "Interview Preparation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-gray-500"
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative">
            <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />

            <div className="relative rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl shadow-blue-100 sm:p-7">

              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    YOUR JOB ANALYSIS
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    Backend Engineer
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    KU Enterprises
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                  AI Report
                </div>
              </div>

              {/* Score */}
              <div className="mt-6 flex items-center gap-6 rounded-2xl bg-blue-50/70 p-5">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[9px] border-blue-600">
                  <div className="absolute inset-[-9px] rounded-full border-[9px] border-gray-200 border-l-transparent border-b-transparent" />
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-blue-700">
                      88%
                    </p>
                    <p className="text-[10px] font-medium text-gray-500">
                      Match Score
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Excellent Match!
                  </p>
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Your resume matches most of the required skills for this position.
                  </p>
                </div>
              </div>

              {/* Skill Analysis */}
              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">
                    Skill Analysis
                  </h4>
                  <span className="text-xs text-blue-700">
                    View Report
                  </span>
                </div>

                {[
                  { name: "Node.js", status: "Strong", width: "95%" },
                  { name: "Express.js", status: "Strong", width: "90%" },
                  { name: "MongoDB", status: "Strong", width: "85%" },
                  { name: "Docker", status: "Improve", width: "40%" },
                ].map((skill) => (
                  <div key={skill.name} className="mb-4">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="font-semibold text-gray-700">
                        {skill.name}
                      </span>
                      <span
                        className={
                          skill.status === "Strong"
                            ? "font-medium text-green-600"
                            : "font-medium text-amber-600"
                        }
                      >
                        {skill.status}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          skill.status === "Strong"
                            ? "bg-blue-600"
                            : "bg-amber-500"
                        }`}
                        style={{ width: skill.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Preparation Plan */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <FontAwesomeIcon icon={faRocket} />
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Personalized Preparation Plan
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Build skills and prepare with confidence.
                  </p>
                </div>
              </div>

              <div className="absolute -right-4 top-28 hidden rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:block">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mr-2 text-green-500"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Analysis Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-white px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Everything You Need to
              <span className="text-[#1D4ED8]"> Prepare for Your Next Job</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#64748B]">
              Get more than just a resume review. Understand your strengths,
              improve your weaknesses, and prepare for your next opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#F8FAFC] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#111827] sm:text-4xl">
              How Job Fit AI Works
            </h2>

            <p className="mt-4 text-sm text-[#64748B]">
              Start analyzing your career opportunities in just three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Upload Your Resume",
                description:
                  "Upload your resume in PDF format and provide your target job description.",
                icon: faFileLines,
              },
              {
                number: "02",
                title: "Analyze Your Job Fit",
                description:
                  "Our AI evaluates your resume against job requirements and identifies skill gaps.",
                icon: faBrain,
              },
              {
                number: "03",
                title: "Prepare & Improve",
                description:
                  "Get your match score, technical questions, and a personalized preparation plan.",
                icon: faRocket,
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-700">
                  <FontAwesomeIcon icon={step.icon} />
                </div>

                <p className="mt-5 text-xs font-bold tracking-widest text-blue-600">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#1D4ED8] px-6 py-14 text-center shadow-xl shadow-blue-100 sm:px-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Discover Your Job Fit?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100">
            Take the next step in your career. Analyze your resume,
            discover your strengths, and prepare for your dream job.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
          >
            Get Started for Free
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D4ED8] text-sm text-white">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>

            <span className="font-bold text-gray-900">
              Job Fit <span className="text-blue-700">AI</span>
            </span>
          </Link>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Job Fit AI. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}

