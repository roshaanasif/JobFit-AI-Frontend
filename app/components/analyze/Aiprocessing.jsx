
// "use client";

// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faFilePdf,
//   faBriefcase,
//   faMagnifyingGlass,
//   faBrain,
//   faListCheck,
//   faCircleCheck,
//   faWandSparkles,
//   faShieldHalved,
// } from "@fortawesome/free-solid-svg-icons";

// const steps = [
//   {
//     title: "Reading your resume",
//     description: "Extracting your experience, skills and technologies.",
//     icon: faFilePdf,
//   },
//   {
//     title: "Analyzing job requirements",
//     description: "Understanding the skills and requirements of the job.",
//     icon: faBriefcase,
//   },
//   {
//     title: "Comparing your profile",
//     description: "Matching your resume against the job description.",
//     icon: faMagnifyingGlass,
//   },
//   {
//     title: "Identifying skill gaps",
//     description: "Finding missing and partially matched skills.",
//     icon: faBrain,
//   },
//   {
//     title: "Creating preparation plan",
//     description: "Generating your personalized preparation plan.",
//     icon: faListCheck,
//   },
// ];

// export default function AnalysisProcessing() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);

//   // Keep the processing indicator moving while the report request is pending.
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentStep((previous) => {
//         if (previous >= steps.length - 1) {
//           clearInterval(interval);
//           return previous;
//         }

//         return previous + 1;
//       });
//     }, 1800);

//     return () => clearInterval(interval);
//   }, []);

//   // Animate progress
//   useEffect(() => {
//     const targetProgress =
//       ((currentStep + 1) / steps.length) * 100;

//     const interval = setInterval(() => {
//       setProgress((previous) => {
//         if (previous >= targetProgress) {
//           clearInterval(interval);
//           return targetProgress;
//         }

//         return Math.min(previous + 2, targetProgress);
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [currentStep]);

//   return (
//     <main className="min-h-[calc(100vh-100px)] bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">

//       <div className="w-full max-w-4xl">

//         {/* Page heading */}
//         <div className="text-center mb-8">

//           <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-[#1D4ED8] mb-5">
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D4ED8]" />
//             </span>
//             AI ENGINE IS WORKING
//           </div>

//           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
//             Analyzing your job fit
//           </h1>

//           <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base leading-7 text-slate-500">
//             We&apos;re comparing your resume with the job requirements
//             to discover your strengths and opportunities.
//           </p>

//         </div>

//         {/* Main card */}
//         <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">

//           {/* Blue hero section */}
//           <div className="relative overflow-hidden bg-gradient-to-br from-[#1D4ED8] via-[#1E40AF] to-[#172554] px-6 py-9 sm:px-12 sm:py-12">

//             {/* Background decoration */}
//             <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
//             <div className="absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-2xl" />
//             <div className="absolute right-1/4 top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

//             <div className="relative z-10 flex flex-col items-center text-center text-white">

//               {/* AI icon */}
//               <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">

//                 {/* <FontAwesomeIcon
//                   icon={faWandMagicSparkles}
//                   className="text-3xl animate-pulse"
//                 /> */}

//                 <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] text-xs text-white shadow-md">
//                   <FontAwesomeIcon icon={faWandSparkles} />
//                 </span>

//               </div>

//               <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
//                 Intelligent job analysis
//               </p>

//               <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
//                 Building your career insights
//               </h2>

//               <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
//                 Our AI is working through your resume and job
//                 description to prepare your personalized report.
//               </p>

//               {/* Progress */}
//               <div className="mt-9 w-full max-w-lg">

//                 <div className="mb-3 flex items-center justify-between">

//                   <span className="text-xs font-medium text-blue-100">
//                     Processing progress
//                   </span>

//                   <span className="text-lg font-bold tabular-nums">
//                     {Math.round(progress)}%
//                   </span>

//                 </div>

//                 <div
//                   className="h-3 overflow-hidden rounded-full bg-white/20 p-[2px]"
//                   role="progressbar"
//                   aria-valuenow={Math.round(progress)}
//                   aria-valuemin={0}
//                   aria-valuemax={100}
//                   aria-label="Simulated processing progress"
//                 >
//                   <div
//                     className="h-full rounded-full bg-gradient-to-r from-amber-300 to-[#F59E0B] transition-all duration-300 ease-out"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 <div className="mt-3 flex justify-between text-[11px] text-blue-200">
//                   <span>Analyzing information</span>
//                   <span>{currentStep + 1} of {steps.length} stages</span>
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* Processing steps */}
         
// {/* Processing Steps - Vertical Timeline */}
// <div className="p-5 sm:p-10">

//   <div className="mb-8 flex items-center justify-between">
//     <div>
//       <h3 className="text-base font-bold text-slate-900">
//         Analysis stages
//       </h3>
//       <p className="mt-1 text-xs text-slate-500">
//         Follow each step as your report is generated
//       </p>
//     </div>

//     <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
//       {Math.min(currentStep + 1, steps.length)} / {steps.length}
//     </span>
//   </div>

//   <div className="relative">

//     {/* Vertical connecting line */}
//     <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-200" />

//     {/* Completed progress line */}
//     <div
//       className="absolute left-[23px] top-6 w-0.5 bg-green-500 transition-all duration-700 ease-in-out"
//       style={{
//         height: `${(currentStep / (steps.length - 1)) * 100}%`,
//       }}
//     />

//     <div className="relative space-y-7">

//       {steps.map((step, index) => {
//         const isCompleted = index < currentStep;
//         const isCurrent = index === currentStep;
//         const isPending = index > currentStep;

//         return (
//           <div
//             key={step.title}
//             className="relative flex items-start gap-4"
//           >

//             {/* Timeline icon */}
//             <div
//               className={`
//                 relative z-10 flex h-12 w-12 shrink-0
//                 items-center justify-center rounded-full
//                 border-4 border-white transition-all duration-500
//                 ${
//                   isCompleted
//                     ? "bg-green-500 text-white shadow-md shadow-green-100"
//                     : isCurrent
//                     ? "bg-[#1D4ED8] text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100"
//                     : "bg-slate-100 text-slate-400"
//                 }
//               `}
//             >
//               <FontAwesomeIcon
//                 icon={isCompleted ? faCircleCheck : step.icon}
//                 className={isCurrent ? "animate-pulse" : "text-base"}
//               />
//             </div>

//             {/* Step content */}
//             <div
//               className={`
//                 flex-1 rounded-2xl border p-4
//                 transition-all duration-500
//                 ${
//                   isCurrent
//                     ? "border-blue-200 bg-blue-50/80 shadow-sm"
//                     : isCompleted
//                     ? "border-green-100 bg-green-50/40"
//                     : "border-slate-100 bg-white"
//                 }
//                 ${isPending ? "opacity-50" : "opacity-100"}
//               `}
//             >

//               <div className="flex items-center justify-between gap-3">

//                 <h4
//                   className={`
//                     text-sm font-bold
//                     ${
//                       isCurrent
//                         ? "text-[#1D4ED8]"
//                         : isCompleted
//                         ? "text-green-700"
//                         : "text-slate-600"
//                     }
//                   `}
//                 >
//                   {step.title}
//                 </h4>

//                 {isCompleted && (
//                   <span className="shrink-0 text-xs font-semibold text-green-600">
//                     Completed
//                   </span>
//                 )}

//                 {isCurrent && (
//                   <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1D4ED8]">
//                     <span className="h-2 w-2 animate-pulse rounded-full bg-[#1D4ED8]" />
//                     Processing
//                   </span>
//                 )}

//                 {isPending && (
//                   <span className="shrink-0 text-xs font-medium text-slate-400">
//                     Pending
//                   </span>
//                 )}

//               </div>

//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 {step.description}
//               </p>

//             </div>

//           </div>
//         );
//       })}

//     </div>
//   </div>

//   {/* Completion message */}
//   <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

//     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1D4ED8] shadow-sm">
//       <FontAwesomeIcon icon={faShieldHalved} />
//     </div>

//     <div>
//       <h4 className="text-sm font-bold text-slate-800">
//         Your information stays protected
//       </h4>

//       <p className="mt-1 text-xs leading-5 text-slate-500">
//         Your resume and job information are processed securely
//         to generate your personalized analysis.
//       </p>
//     </div>

//   </div>

// </div>

//         </div>

//         {/* Bottom message */}
//         <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
//           <FontAwesomeIcon icon={faWandSparkles} className="text-[#F59E0B]" />
//           <span>Please keep this page open while your analysis is being prepared.</span>
//         </div>

//       </div>
//     </main>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  faFilePdf,
  faBriefcase,
  faMagnifyingGlass,
  faBrain,
  faListCheck,
  faCircleCheck,
  faWandSparkles,
  faShieldHalved,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    title: "Reading your resume",
    description: "Extracting your experience, skills and technologies.",
    icon: faFilePdf,
  },
  {
    title: "Analyzing job requirements",
    description: "Understanding the skills and requirements of the job.",
    icon: faBriefcase,
  },
  {
    title: "Comparing your profile",
    description: "Matching your resume against the job description.",
    icon: faMagnifyingGlass,
  },
  {
    title: "Identifying skill gaps",
    description: "Finding missing and partially matched skills.",
    icon: faBrain,
  },
  {
    title: "Creating preparation plan",
    description: "Generating your personalized preparation plan.",
    icon: faListCheck,
  },
  {
    title: "Finalizing your report",
    description: "Preparing your comprehensive analysis.",
    icon: faWandSparkles,
  },
];

export default function AnalysisProcessing({submit}) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const {
    analyzeLoading,
    analyzeSuccess,
    analyzeError,
    generatedReport,
  } = useSelector((state) => state.analyze);

  const isProcessing = analyzeLoading;
  const isCompleted = analyzeSuccess;
  const hasError = Boolean(analyzeError);

  // Move through the first four steps automatically.
  // Stop at the fifth step until the API responds.
  useEffect(() => {
    if (!analyzeLoading || analyzeError || analyzeSuccess) {
      return;
    }

    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((previousStep) => {
        // Keep the fifth step active.
        if (previousStep >= steps.length - 1) {
          return steps.length - 1;
        }

        return previousStep + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [analyzeLoading, analyzeError, analyzeSuccess]);

  // Navigate when the API successfully returns the report.
  useEffect(() => {
    if (analyzeSuccess && generatedReport) {
      const reportId =
        generatedReport?._id ||
        generatedReport?.report?._id ||
        generatedReport?.data?._id;

      if (reportId) {
        submit(false)
        router.replace(`/analysis/${reportId}`);
      }
    }
  }, [analyzeSuccess, generatedReport, router]);

  // Progress stays at 80% while the fifth step is waiting.
  const progress = isCompleted
    ? 100
    : Math.min((currentStep / steps.length) * 100, 80);

  return (
    <main className="min-h-[calc(100vh-100px)] bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 flex items-center justify-center">

      <div className="w-full max-w-4xl">

        {/* Page heading */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-[#1D4ED8] mb-5">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D4ED8]" />
            </span>

            {hasError
              ? "ANALYSIS FAILED"
              : isCompleted
              ? "ANALYSIS COMPLETED"
              : "AI ENGINE IS WORKING"}

          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {hasError
              ? "Unable to analyze your job fit"
              : isCompleted
              ? "Your analysis is ready"
              : "Analyzing your job fit"}
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base leading-7 text-slate-500">
            {hasError
              ? "Something went wrong while generating your report. Please try again."
              : isCompleted
              ? "Your personalized career insights have been generated."
              : "We're comparing your resume with the job requirements to discover your strengths and opportunities."}
          </p>

        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">

          {/* Blue hero section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1D4ED8] via-[#1E40AF] to-[#172554] px-6 py-9 sm:px-12 sm:py-12">

            {/* Background decoration */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
            <div className="absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-2xl" />
            <div className="absolute right-1/4 top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center text-white">

              {/* AI icon */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">

                <FontAwesomeIcon
                  icon={faWandSparkles}
                  className={`text-3xl ${isProcessing ? "animate-pulse" : ""}`}
                />

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] text-xs text-white shadow-md">
                  <FontAwesomeIcon icon={faWandSparkles} />
                </span>

              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Intelligent job analysis
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                {hasError
                  ? "Analysis encountered an issue"
                  : "Building your career insights"}
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
                {hasError
                  ? "We couldn't complete your personalized report. Please try submitting your analysis again."
                  : "Our AI is working through your resume and job description to prepare your personalized report."}
              </p>

              {/* Progress */}
              <div className="mt-9 w-full max-w-lg">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-xs font-medium text-blue-100">
                    Processing progress
                  </span>

                  <span className="text-lg font-bold tabular-nums">
                    {hasError
                      ? "Failed"
                      : `${Math.round(progress)}%`}
                  </span>

                </div>

                <div
                  className="h-3 overflow-hidden rounded-full bg-white/20 p-[2px]"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Analysis processing progress"
                >
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-amber-300 to-[#F59E0B] transition-all duration-700 ease-in-out ${
                      isProcessing && currentStep === steps.length - 1
                        ? "animate-pulse"
                        : ""
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-[11px] text-blue-200">
                  <span>
                    {hasError
                      ? "Something went wrong"
                      : isCompleted
                      ? "Report generated"
                      : currentStep === steps.length - 1
                      ? "Finalizing your report"
                      : "Analyzing information"}
                  </span>

                  <span>
                    {isCompleted
                      ? `${steps.length} of ${steps.length} stages`
                      : `${currentStep} of ${steps.length} completed`}
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Processing Steps - Vertical Timeline */}
          <div className="p-5 sm:p-10">

            <div className="mb-8 flex items-center justify-between">

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Analysis stages
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Follow each step as your report is generated
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
                {isCompleted
                  ? `${steps.length} / ${steps.length}`
                  : `${currentStep} / ${steps.length}`}
              </span>

            </div>

            <div className="relative">

              {/* Vertical connecting line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-slate-200" />

              {/* Completed progress line */}
              <div
                className="absolute left-[23px] top-6 w-0.5 bg-green-500 transition-all duration-700 ease-in-out"
                style={{
                  height: `${
                    (Math.min(
                      isCompleted ? steps.length : currentStep,
                      steps.length - 1
                    ) /
                      (steps.length - 1)) *
                    100
                  }%`,
                }}
              />

              <div className="relative space-y-7">

                {steps.map((step, index) => {

                  const stepCompleted =
                    isCompleted || index < currentStep;

                  const isCurrent =
                    !isCompleted &&
                    !hasError &&
                    isProcessing &&
                    index === currentStep;

                  const isPending =
                    !stepCompleted && !isCurrent;

                  return (
                    <div
                      key={step.title}
                      className="relative flex items-start gap-4"
                    >

                      {/* Timeline icon */}
                      <div
                        className={`
                          relative z-10 flex h-12 w-12 shrink-0
                          items-center justify-center rounded-full
                          border-4 border-white transition-all duration-500
                          ${
                            stepCompleted
                              ? "bg-green-500 text-white shadow-md shadow-green-100"
                              : isCurrent
                              ? "bg-[#1D4ED8] text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100"
                              : "bg-slate-100 text-slate-400"
                          }
                        `}
                      >

                        <FontAwesomeIcon
                          icon={
                            stepCompleted
                              ? faCircleCheck
                              : isCurrent
                              ? faSpinner
                              : step.icon
                          }
                          spin={isCurrent}
                          className="text-base"
                        />

                      </div>

                      {/* Step content */}
                      <div
                        className={`
                          flex-1 rounded-2xl border p-4
                          transition-all duration-500
                          ${
                            stepCompleted
                              ? "border-green-100 bg-green-50/40"
                              : isCurrent
                              ? "border-blue-200 bg-blue-50/80 shadow-sm"
                              : "border-slate-100 bg-white"
                          }
                          ${isPending ? "opacity-50" : "opacity-100"}
                        `}
                      >

                        <div className="flex items-center justify-between gap-3">

                          <h4
                            className={`
                              text-sm font-bold
                              ${
                                stepCompleted
                                  ? "text-green-700"
                                  : isCurrent
                                  ? "text-[#1D4ED8]"
                                  : "text-slate-600"
                              }
                            `}
                          >
                            {step.title}
                          </h4>

                          {stepCompleted && (
                            <span className="shrink-0 text-xs font-semibold text-green-600">
                              Completed
                            </span>
                          )}

                          {isCurrent && (
                            <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1D4ED8]">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1D4ED8]" />
                              Processing
                            </span>
                          )}

                          {isPending && (
                            <span className="shrink-0 text-xs font-medium text-slate-400">
                              {hasError ? "Not completed" : "Pending"}
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {step.description}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Error message */}
            {hasError && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </div>

                  <div className="flex-1">

                    <h4 className="text-sm font-bold text-red-700">
                      Report generation failed
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-red-600">
                      {typeof analyzeError === "string"
                        ? analyzeError
                        : "Something went wrong while generating your report."}
                    </p>

                    <button
                      onClick={() => router.replace("/analyze")}
                      className="mt-4 rounded-lg bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Try Again
                    </button>

                  </div>
                </div>
              </div>
            )}

            {/* Security message */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1D4ED8] shadow-sm">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Your information stays protected
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your resume and job information are processed securely
                  to generate your personalized analysis.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom message */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">

          <FontAwesomeIcon
            icon={faWandSparkles}
            className="text-[#F59E0B]"
          />

          <span>
            Please keep this page open while your analysis is being prepared.
          </span>

        </div>

      </div>
    </main>
  );
}
