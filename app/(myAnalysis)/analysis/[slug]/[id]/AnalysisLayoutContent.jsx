"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch,useSelector } from "react-redux";
import {singleReport} from "../../../../Redux/analyze/analyzeThunk"

import {
  faGaugeHigh,
  faListCheck,
  faCode,
  faBriefcase,
  faChartLine,
  faArrowLeft,
  faBars,
  faXmark,
  faFilePdf,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";



const navigation = [
  { label: "Overview", tab: "overview", icon: faGaugeHigh },
  { label: "Preparation Plan", tab: "preparation", icon: faListCheck },
  { label: "Technical Questions", tab: "questions", icon: faCode },
  { label: "Job Description", tab: "job-description", icon: faBriefcase },
];

export default function AnalysisLayout({ children }) {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const handleBack = () => {
    if (from === "dashboard") {
      router.push("/dashboard");
    } else if (from === "history") {
      router.push("/history");
    } else {
      router.push("/dashboard");
    }
  };
  const id = params.id;
  const activeTab = searchParams.get("tab") || "overview";
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    singleReportLoading: loading,
    Reportsingle: report,
    singleReportError: error,
  } = useSelector(
    (state) => state.analyze
  );

useEffect(() => {
  if (!user?._id || !id) return;

  const loadReport = async () => {
    try {
      await dispatch(singleReport({ id })).unwrap();
    } catch (error) {
      console.error("Failed to fetch report:", error);
    }
  };

  loadReport();
}, [dispatch, user?._id, id]);

  const changeTab = (tab) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("tab", tab);

    router.push(`${pathname}?${query.toString()}`);
    setLeftOpen(false);
  };

  const score = report?.matchScore ?? 0;
  const skillGaps = report?.skillGap ?? [];

  const getSeverityStyle = (severity) => {
    const value = severity?.toLowerCase();

    if (value === "high") {
      return "bg-red-50 text-red-600";
    }

    if (value === "medium") {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-blue-50 text-[#1D4ED8]";
  };

  // This represents improvement priority, not an AI-generated
  // numerical proficiency score. Replace with real scores if available.
  const getImprovementPercent = (severity) => {
    const value = severity?.toLowerCase();

    if (value === "high") return 80;
    if (value === "medium") return 55;
    return 30;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Mobile overlays */}
      {(leftOpen || rightOpen) && (
        <button
          aria-label="Close sidebar"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      <div className="flex min-h-screen">
        {/* LEFT SIDEBAR */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 h-screen w-72 flex flex-col
            border-r border-slate-200 bg-white transition-transform
            duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen
            lg:translate-x-0
            ${leftOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
              <FontAwesomeIcon icon={faChartLine} />
            </div>

            <div className="min-w-0">
              <h1 className="font-bold">Job Fit AI</h1>
              <p className="text-xs text-[#64748B]">Analysis report</p>
            </div>

            <button
              onClick={() => setLeftOpen(false)}
              className="ml-auto rounded-lg p-2 text-slate-500 lg:hidden"
              aria-label="Close navigation"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <button
              onClick={handleBack}
              className="mb-7 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#64748B] hover:bg-blue-50 hover:text-[#1D4ED8]"
            >
           
            <FontAwesomeIcon icon={faArrowLeft} />
              {from==="dashboard" ? "Back to Dashboard" :" Back to My Analyses"}
            </button>


            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              Report Navigation
            </p>

            <nav className="space-y-1.5">
              {navigation.map((item) => {
                const active = activeTab === item.tab;

                return (
                  <button
                    key={item.tab}
                    onClick={() => changeTab(item.tab)}
                    className={`
                      flex w-full items-center gap-3 rounded-xl px-3 py-3
                      text-left text-sm font-medium transition
                      ${
                        active
                          ? "bg-blue-50 text-[#1D4ED8]"
                          : "text-[#64748B] hover:bg-slate-50 hover:text-[#111827]"
                      }
                    `}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-5"
                    />
                    {item.label}

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-[#1D4ED8]" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl bg-[#1D4ED8] p-4 text-white">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>

              <h3 className="text-sm font-semibold">Keep improving</h3>
              <p className="mt-1 text-xs leading-5 text-blue-100">
                Focus on your identified skill gaps to prepare for your next interview.
              </p>

              <button
                onClick={() => router.push("/analyze")}
                className="mt-4 w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-[#1D4ED8] hover:bg-blue-50"
              >
                New Analysis
              </button>
            </div>
          </div>
        </aside>

        {/* CENTER + RIGHT */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLeftOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#64748B] hover:bg-slate-100 lg:hidden"
                aria-label="Open navigation"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>

              <div>
                <p className="text-xs text-[#64748B]">Job Fit AI / Report</p>
                <h2 className="text-sm font-semibold sm:text-base">
                  {report?.jobRole || "Job Analysis"}
                </h2>
              </div>
            </div>

            <button
              onClick={() => setRightOpen(true)}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm text-[#1D4ED8] hover:bg-blue-50 xl:hidden"
            >
              <FontAwesomeIcon icon={faChartLine} />
              Skills
            </button>
          </header>

          <div className="flex items-start">
            {/* MAIN CONTENT */}
            <main className="min-w-0 flex-1 p-4 sm:p-6 xl:p-8">
              {loading ? (
                <div className="mx-auto mt-16 max-w-md text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#1D4ED8]" />
                  <p className="mt-4 text-sm text-[#64748B]">
                    Loading your analysis...
                  </p>
                </div>
              ) : error ? (
                <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-2xl text-red-500"
                  />
                  <h2 className="mt-3 font-bold">Unable to open analysis</h2>
                  <p className="mt-2 text-sm text-[#64748B]">{error}</p>
                  <button
                    onClick={handleBack}
                    className="mt-5 rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Back
                  </button>
                </div>
              ) : (
                children
              )}
            </main>

            {/* RIGHT SKILL SIDEBAR */}
            <aside
              className={`
                fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto
                border-l border-slate-200 bg-white p-5
                transition-transform duration-300
                xl:sticky xl:top-16 xl:z-20 xl:block
                xl:h-[calc(100vh-4rem)] xl:translate-x-0
                ${
                  rightOpen
                    ? "translate-x-0"
                    : "translate-x-full xl:translate-x-0"
                }
              `}
            >
              <div className="mb-6 flex items-center justify-between xl:hidden">
                <h2 className="font-bold">Skill Gaps</h2>
                <button
                  onClick={() => setRightOpen(false)}
                  aria-label="Close skills"
                  className="rounded-lg p-2 text-slate-500"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* Match score */}
              <section className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-medium text-[#64748B]">
                  Overall Job Match
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(#1D4ED8 ${score}%, #E2E8F0 ${score}% 100%)`,
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                      <span className="text-xl font-bold text-[#111827]">
                        {score}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-[#111827]">
                      {report?.jobRole || "Target role"}
                    </p>
                    <p className="mt-1 text-xs text-[#64748B]">
                      {report?.company || "Company not specified"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#1D4ED8]"
                    style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                  />
                </div>
              </section>

              {/* Skill gaps */}
              <section className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-[#111827]">Skill Gaps</h3>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    {skillGaps.length} identified
                  </span>
                </div>

                <p className="mb-4 text-xs leading-5 text-[#64748B]">
                  Focus on these areas to strengthen your preparation.
                </p>

                {skillGaps.length > 0 ? (
                  <div className="space-y-4">
                    {skillGaps.map((item) => {
                      const improvement = getImprovementPercent(item.severity);

                      return (
                        <div
                          key={item.skill}
                          className="rounded-xl border border-slate-200 p-3.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-[#111827]">
                              {item.skill}
                            </p>
                            <span
                              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${getSeverityStyle(item.severity)}`}
                            >
                              {item.severity || "Review"}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
                            <span>Improvement priority</span>
                            <span className="font-semibold text-[#111827]">
                              {improvement}%
                            </span>
                          </div>

                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#F59E0B]"
                              style={{ width: `${improvement}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 p-4 text-sm text-[#64748B]">
                    No skill gaps were returned for this report.
                  </div>
                )}
              </section>

              <div className="mt-6 rounded-xl bg-amber-50 p-4">
                <p className="text-sm font-semibold text-[#111827]">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="mr-2 text-[#F59E0B]"
                  />
                  Improvement tip
                </p>
                <p className="mt-2 text-xs leading-5 text-[#64748B]">
                  Start with your identified skill gaps, practice with a small project,
                  and then review related interview questions.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
