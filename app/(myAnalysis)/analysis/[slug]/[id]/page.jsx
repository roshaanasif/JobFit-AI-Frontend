"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartPie,
  faBullseye,
  faCalendarDays,
  faCircleCheck,
  faClock,
  faCode,
  faChevronDown,
  faChevronUp,
  faBriefcase,
  faFileLines,
  faGraduationCap,
  faArrowRight,
  faLightbulb,
  faBuilding,
  faListCheck
} from "@fortawesome/free-solid-svg-icons";

import {slugify} from "../../../../utils/all"


export default function AnalysisPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();


  const tab = searchParams.get("tab") || "overview";

  const [expandedQuestions, setExpandedQuestions] = useState({});


  const { Reportsingle: report, singleReportError: error } = useSelector(
    (state) => state.analyze
  );

  const toggleQuestion = (index) => {
    setExpandedQuestions((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const score = report?.matchScore ?? 0;
  const plans = report?.preparationPlan ?? [];
  const questions = report?.technicalQuestions ?? [];
  const skillGaps = report?.skillGap ?? [];
  const Company = report?.company ?? "";
  const jobRole = report?.jobRole ?? "";

  const formattedDate = report?.createdAt
    ? new Date(report.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Date unavailable";

  if (error || !report) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-[#111827]">
          Unable to load analysis
        </h2>
        <p className="mt-2 text-sm text-[#64748B]">
          {error || "The requested report could not be found."}
        </p>
        <button
          onClick={() => router.push("/history")}
          className="mt-5 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to History
        </button>
      </div>
    );
  }

  const SectionHeading = ({ eyebrow, title, description }) => (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold text-[#111827] sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
          {description}
        </p>
      )}
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );

  const EmptyState = ({ message }) => (
    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-[#64748B]">
      {message}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl">
      {/* =========================
          OVERVIEW
      ========================= */}
      {tab === "overview" && (
        <>
          <SectionHeading
            eyebrow="Analysis Overview"
            title={jobRole || "Job Analysis"}
            description="Understand your current job match, review your skill gaps, and prepare for your target role."
          />

          <Card className="overflow-hidden !border-0 !bg-[#1D4ED8] text-white">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-blue-100">
                  <FontAwesomeIcon icon={faChartPie} />
                  AI Match Report
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  {jobRole || "Target Position"}
                </h2>

                <p className="mt-2 text-sm text-blue-100">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="mr-2"
                  />
                  {Company || "Company not specified"}
                </p>

                <p className="mt-4 text-sm leading-6 text-blue-100">
                  Your resume has been compared against the job requirements.
                  Review your preparation plan and focus on the skill gaps.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:gap-2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/10">
                  <span className="text-3xl font-bold">{score}%</span>
                </div>
                <p className="text-sm font-semibold">Match Score</p>
              </div>
            </div>
          </Card>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1D4ED8]">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <p className="mt-4 text-sm text-[#64748B]">Job Match</p>
              <p className="mt-1 text-2xl font-bold text-[#111827]">
                {score}%
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#F59E0B]">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <p className="mt-4 text-sm text-[#64748B]">Skill Gaps</p>
              <p className="mt-1 text-2xl font-bold text-[#111827]">
                {skillGaps.length}
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FontAwesomeIcon icon={faCalendarDays} />
              </div>
              <p className="mt-4 text-sm text-[#64748B]">Plan Duration</p>
              <p className="mt-1 text-2xl font-bold text-[#111827]">
                {plans.length} {plans.length === 1 ? "day" : "days"}
              </p>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1D4ED8]">
                  <FontAwesomeIcon icon={faListCheck} />
                </div>
                <div>
                  <h2 className="font-bold text-[#111827]">
                    Your Preparation Plan
                  </h2>
                  <p className="text-sm text-[#64748B]">
                    {plans.length} planned learning{" "}
                    {plans.length === 1 ? "day" : "days"}
                  </p>
                </div>
              </div>

              {plans.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {plans.slice(0, 2).map((plan) => (
                    <div
                      key={plan.day}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#1D4ED8] shadow-sm">
                        {plan.day}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-[#111827]">
                          {plan.focus}
                        </h3>
                        <p className="mt-1 text-xs text-[#64748B]">
                          {plan.tasks?.length || 0} learning tasks
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState message="No preparation plan is available." />
                </div>
              )}

              <button
                onClick={() => router.push(`/analysis/${slugify(jobRole)}/${id}?tab=preparation`)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                View Full Preparation Plan
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <h2 className="font-bold text-[#111827]">
                Technical Interview Practice
              </h2>
              <p className="mt-2 text-sm text-[#64748B]">
                Review generated questions, suggested answers, and what each
                question is designed to assess.
              </p>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#1D4ED8]">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Technical Questions
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {questions.length} questions available
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/analysis/${slugify(jobRole)}/${id}?tab=questions`)}
                  aria-label="View technical questions"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1D4ED8]"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </Card>
          </div>

          <p className="mt-5 text-xs text-[#64748B]">
            Analysis created {formattedDate}
          </p>
        </>
      )}

      {/* =========================
          PREPARATION PLAN
      ========================= */}
      {tab === "preparation" && (
        <>
          <SectionHeading
            eyebrow="Your Learning Roadmap"
            title="Preparation Plan"
            description="Follow the day-by-day tasks to strengthen your skills and prepare for the target role."
          />

          <Card className="mb-5 bg-blue-50/70">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1D4ED8]">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div>
                <h2 className="font-bold text-[#111827]">
                  Personalized for {report.jobRole || "your target role"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  Prioritize the topics identified in your report. Marking tasks
                  complete is a personal tracking choice; it does not change
                  your AI-generated match score.
                </p>
              </div>
            </div>
          </Card>

          {plans.length > 0 ? (
            <div className="space-y-5">
              {plans.map((plan) => (
                <Card key={plan.day}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8] text-lg font-bold text-white">
                      {plan.day}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-[#111827]">
                          {plan.focus || `Day ${plan.day}`}
                        </h2>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                          Day {plan.day}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {plan.tasks?.length || 0} tasks for this day
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {(plan.tasks || []).map((task, index) => (
                      <div
                        key={`${plan.day}-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs text-green-600">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </span>

                        <p className="text-sm leading-6 text-[#475569]">
                          {task}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState message="Your AI preparation plan has no days to display." />
          )}
        </>
      )}

      {/* =========================
          TECHNICAL QUESTIONS
      ========================= */}
      {tab === "questions" && (
        <>
          <SectionHeading
            eyebrow="Interview Preparation"
            title="Technical Questions"
            description="Practice the questions below, review the suggested answers, and understand what the interviewer is assessing."
          />

          <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                {report.jobRole || "Technical Interview"}
              </p>
              <p className="mt-1 text-xs text-[#64748B]">
                AI-generated practice questions
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-[#1D4ED8]">
              {questions.length} Questions
            </span>
          </div>

          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((item, index) => {
                const isExpanded = Boolean(expandedQuestions[index]);

                return (
                  <Card key={`${index}-${item.Question}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-[#1D4ED8]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-base font-bold leading-6 text-[#111827]">
                          {item.Question || item.question}
                        </h2>

                        <button
                          onClick={() => toggleQuestion(index)}
                          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-[#1D4ED8] hover:bg-blue-100"
                        >
                          {isExpanded ? "Hide Answer" : "View Answer"}
                          <FontAwesomeIcon
                            icon={isExpanded ? faChevronUp : faChevronDown}
                          />
                        </button>

                        {isExpanded && (
                          <div className="mt-4 space-y-4">
                            <div className="rounded-xl bg-slate-50 p-4">
                              <h3 className="text-sm font-bold text-[#111827]">
                                Suggested Answer
                              </h3>
                              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#475569]">
                                {item.Answer || item.answer || "No answer provided."}
                              </p>
                            </div>

                            {item.Intention && (
                              <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                                <h3 className="text-sm font-bold text-[#111827]">
                                  What this question assesses
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                                  {item.Intention}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState message="No technical questions were generated for this analysis." />
          )}
        </>
      )}

      {/* =========================
          JOB DESCRIPTION
      ========================= */}
      {tab === "job-description" && (
        <>
          <SectionHeading
            eyebrow="Role Requirements"
            title="Job Description"
            description="Review the original job description and the additional information used for your analysis."
          />

          <Card className="mb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1D4ED8]">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#111827]">
                  {jobRole || "Target Role"}
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                  {Company || "Company not specified"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="mb-5">
            <h2 className="flex items-center gap-2 font-bold text-[#111827]">
              <FontAwesomeIcon
                icon={faFileLines}
                className="text-[#1D4ED8]"
              />
              Original Job Description
            </h2>

            <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#475569]">
              {report.jobDescription || "No job description available."}
            </div>
          </Card>

          <Card className="mb-5">
            <h2 className="font-bold text-[#111827]">
              Additional Description
            </h2>

            <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[#475569]">
              {report.description || "No additional description was provided."}
            </div>
          </Card>

          <Card>
            <h2 className="font-bold text-[#111827]">Resume Text</h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Extracted resume content used for the analysis
            </p>

            <div className="mt-4 max-h-[500px] overflow-y-auto whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm leading-7 text-[#475569]">
              {report.resume || "No extracted resume text available."}
            </div>
          </Card>
        </>
      )}

      {/* Invalid tab */}
      {!["overview", "preparation", "questions", "job-description"].includes(tab) && (
        <Card>
          <h2 className="font-bold text-[#111827]">Page not found</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Select a section from the report navigation.
          </p>
          <button
            onClick={() => router.replace(`/analysis/${slugify(jobRole)}/${id}?tab=overview`)}
            className="mt-4 rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Go to Overview
          </button>
        </Card>
      )}
    </div>
  );
}