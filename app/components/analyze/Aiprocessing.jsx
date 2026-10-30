// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {  useSelector } from "react-redux";

// import {
//   faFilePdf,
//   faBriefcase,
//   faMagnifyingGlass,
//   faBrain,
//   faListCheck,
//   faCircleCheck,
//   faWandMagicSparkles,
//   faShieldHalved,
//   faSparkles,
// } from "@fortawesome/free-solid-svg-icons";

// export default function AnalysisProcessing() {
//   const router = useRouter();


//   const { analyzeLoading } = useSelector(
//     (state) => state.analyze
//   );

//   useEffect(() => {
//     if (!analyzeLoading) {
//       router.push("/analyze");
//     }
//   }, [analyzeLoading, router]);



//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);

//   const steps = [
//     {
//       title: "Reading your resume",
//       description: "Extracting your experience, skills and technologies.",
//       icon: faFilePdf,
//     },
//     {
//       title: "Analyzing job requirements",
//       description: "Understanding the skills and requirements of the job.",
//       icon: faBriefcase,
//     },
//     {
//       title: "Comparing your profile",
//       description: "Matching your resume against the job description.",
//       icon: faMagnifyingGlass,
//     },
//     {
//       title: "Identifying skill gaps",
//       description: "Finding missing and partially matched skills.",
//       icon: faBrain,
//     },
//     {
//       title: "Creating preparation plan",
//       description: "Generating a personalized plan for your preparation.",
//       icon: faListCheck,
//     },
//   ];


//   /* =========================
//       SIMULATE AI PROCESS
//   ========================= */

//   useEffect(() => {
//     const stepDuration = 1800;

//     const interval = setInterval(() => {
//       setCurrentStep((previous) => {

//         if (previous < steps.length - 1) {
//           return previous + 1;
//         }

//         clearInterval(interval);

//         return previous;
//       });
//     }, stepDuration);

//     return () => clearInterval(interval);
//   }, []);


//   /* =========================
//       PROGRESS
//   ========================= */

//   useEffect(() => {
//     const targetProgress =
//       ((currentStep + 1) / steps.length) * 100;

//     const progressInterval = setInterval(() => {
//       setProgress((previous) => {

//         if (previous >= targetProgress) {
//           clearInterval(progressInterval);
//           return targetProgress;
//         }

//         return previous + 2;
//       });
//     }, 30);

//     return () => clearInterval(progressInterval);
//   }, [currentStep]);


//   /* =========================
//       GO TO RESULTS
//   ========================= */

//   useEffect(() => {
//     if (currentStep === steps.length - 1 && progress >= 100) {

//       const timeout = setTimeout(() => {
//         router.push("/analysis/");
//       }, 1200);

//       return () => clearTimeout(timeout);
//     }
//   }, [currentStep, progress, router]);




//   return (

//     analyzeLoading ?
//    ( <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">

//       <div className="w-full max-w-3xl">

//         {/* =========================
//             MAIN CARD
//         ========================= */}

//         <div className="
//           bg-white
//           rounded-3xl
//           border border-slate-200
//           shadow-sm
//           overflow-hidden
//         ">


//           {/* =========================
//               TOP BLUE SECTION
//           ========================= */}

//           <div className="
//             relative
//             overflow-hidden
//             bg-[#1D4ED8]
//             px-6
//             py-10
//             sm:px-10
//             sm:py-12
//             text-white
//             text-center
//           ">

//             {/* Decorative circles */}

//             <div className="
//               absolute
//               -top-24
//               -right-24
//               w-72
//               h-72
//               rounded-full
//               bg-white/10
//             " />

//             <div className="
//               absolute
//               -bottom-32
//               -left-20
//               w-80
//               h-80
//               rounded-full
//               bg-[#F59E0B]/20
//             " />


//             <div className="relative z-10">

//               {/* AI Icon */}

//               <div className="
//                 mx-auto
//                 w-16
//                 h-16
//                 rounded-2xl
//                 bg-white/10
//                 border
//                 border-white/20
//                 flex
//                 items-center
//                 justify-center
//               ">

//                 <FontAwesomeIcon
//                   icon={faWandMagicSparkles}
//                   className="text-2xl animate-pulse"
//                 />

//               </div>


//               <p className="
//                 mt-6
//                 text-sm
//                 font-semibold
//                 text-blue-100
//                 uppercase
//                 tracking-wider
//               ">
//                 AI Job Analysis
//               </p>


//               <h1 className="
//                 mt-2
//                 text-3xl
//                 sm:text-4xl
//                 font-bold
//               ">
//                 Analyzing your job fit
//               </h1>


//               <p className="
//                 mt-3
//                 text-blue-100
//                 text-sm
//                 sm:text-base
//                 max-w-xl
//                 mx-auto
//                 leading-6
//               ">
//                 Our AI is comparing your resume with the
//                 job requirements to understand how well
//                 you're prepared.
//               </p>


//               {/* Progress */}

//               <div className="
//                 mt-8
//                 max-w-md
//                 mx-auto
//               ">

//                 <div className="
//                   flex
//                   items-center
//                   justify-between
//                   text-xs
//                   text-blue-100
//                   mb-2
//                 ">

//                   <span>
//                     Analysis progress
//                   </span>

//                   <span>
//                     {Math.round(progress)}%
//                   </span>

//                 </div>


//                 <div className="
//                   h-2
//                   rounded-full
//                   bg-white/20
//                   overflow-hidden
//                 ">

//                   <div
//                     className="
//                       h-full
//                       rounded-full
//                       bg-[#F59E0B]
//                       transition-all
//                       duration-300
//                     "
//                     style={{
//                       width: `${progress}%`,
//                     }}
//                   />

//                 </div>

//               </div>

//             </div>

//           </div>


//           {/* =========================
//               PROCESSING STEPS
//           ========================= */}

//           <div className="p-6 sm:p-10">

//             <div className="space-y-2">

//               {steps.map((step, index) => {

//                 const isCompleted =
//                   index < currentStep;

//                 const isCurrent =
//                   index === currentStep;

//                 const isPending =
//                   index > currentStep;


//                 return (
//                   <div
//                     key={step.title}
//                     className={`
//                       relative
//                       flex
//                       items-center
//                       gap-4
//                       p-4
//                       rounded-2xl
//                       transition-all
//                       duration-500

//                       ${
//                         isCurrent
//                           ? "bg-blue-50 border border-blue-100"
//                           : ""
//                       }

//                       ${
//                         isCompleted
//                           ? "opacity-80"
//                           : ""
//                       }

//                       ${
//                         isPending
//                           ? "opacity-40"
//                           : ""
//                       }
//                     `}
//                   >


//                     {/* Icon */}

//                     <div
//                       className={`
//                         w-11
//                         h-11
//                         rounded-xl
//                         flex
//                         items-center
//                         justify-center
//                         shrink-0
//                         transition-all

//                         ${
//                           isCompleted
//                             ? "bg-green-50 text-green-600"
//                             : ""
//                         }

//                         ${
//                           isCurrent
//                             ? "bg-[#1D4ED8] text-white"
//                             : ""
//                         }

//                         ${
//                           isPending
//                             ? "bg-slate-100 text-[#64748B]"
//                             : ""
//                         }
//                       `}
//                     >

//                       {isCompleted ? (

//                         <FontAwesomeIcon
//                           icon={faCircleCheck}
//                         />

//                       ) : (

//                         <FontAwesomeIcon
//                           icon={step.icon}
//                           className={
//                             isCurrent
//                               ? "animate-pulse"
//                               : ""
//                           }
//                         />

//                       )}

//                     </div>


//                     {/* Content */}

//                     <div className="flex-1 min-w-0">

//                       <h3 className={`
//                         text-sm
//                         font-semibold
//                         ${
//                           isCurrent
//                             ? "text-[#1D4ED8]"
//                             : "text-[#111827]"
//                         }
//                       `}>
//                         {step.title}
//                       </h3>


//                       <p className="
//                         mt-1
//                         text-xs
//                         sm:text-sm
//                         text-[#64748B]
//                       ">
//                         {step.description}
//                       </p>

//                     </div>


//                     {/* Status */}

//                     <div className="shrink-0">

//                       {isCompleted && (
//                         <span className="
//                           text-xs
//                           font-semibold
//                           text-green-600
//                         ">
//                           Complete
//                         </span>
//                       )}


//                       {isCurrent && (
//                         <div className="
//                           flex
//                           items-center
//                           gap-1
//                         ">

//                           <span className="
//                             w-1.5
//                             h-1.5
//                             rounded-full
//                             bg-[#F59E0B]
//                             animate-pulse
//                           " />

//                           <span className="
//                             text-xs
//                             font-semibold
//                             text-[#F59E0B]
//                           ">
//                             Working
//                           </span>

//                         </div>
//                       )}

//                     </div>

//                   </div>
//                 );
//               })}

//             </div>


//             {/* =========================
//                 FOOTER MESSAGE
//             ========================= */}

//             <div className="
//               mt-8
//               pt-6
//               border-t
//               border-slate-100
//               flex
//               items-start
//               gap-3
//             ">

//               <div className="
//                 w-9
//                 h-9
//                 rounded-lg
//                 bg-amber-50
//                 text-[#F59E0B]
//                 flex
//                 items-center
//                 justify-center
//                 shrink-0
//               ">

//                 <FontAwesomeIcon
//                   icon={faCircleCheck}
//                 />

//               </div>


//               <div>

//                 <p className="
//                   text-sm
//                   font-semibold
//                   text-[#111827]
//                 ">
//                   Your data is being analyzed securely
//                 </p>

//                 <p className="
//                   mt-1
//                   text-xs
//                   text-[#64748B]
//                   leading-5
//                 ">
//                   This may take a few moments while we
//                   analyze your resume and job requirements.
//                 </p>

//               </div>

//             </div>


//             {/* =========================
//                 RESULT BUTTON
//             ========================= */}

//             {/* {progress >= 100 && (

//               <button
//                 onClick={() =>
//                   router.push("/dashboard")
//                 }
//                 className="
//                   mt-6
//                   w-full
//                   flex
//                   items-center
//                   justify-center
//                   gap-2
//                   px-5
//                   py-3
//                   rounded-xl
//                   bg-[#1D4ED8]
//                   text-white
//                   text-sm
//                   font-semibold
//                   hover:bg-[#1e40af]
//                   transition
//                 "
//               >

//                 View Your Results

//                 <FontAwesomeIcon
//                   icon={faArrowRight}
//                 />

//               </button>

//             )} */}

//           </div>

//         </div>


//         {/* =========================
//             BOTTOM TEXT
//         ========================= */}

//         <p className="
//           mt-5
//           text-center
//           text-xs
//           text-[#64748B]
//         ">
//           Don't close this page while your analysis is
//           being prepared.
//         </p>

//       </div>

//     </div>):(
//         ""
//     )

// )
//     }
  



"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFilePdf,
  faBriefcase,
  faMagnifyingGlass,
  faBrain,
  faListCheck,
  faCircleCheck,
  faWandSparkles,
  faShieldHalved,
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
];

export default function AnalysisProcessing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Keep the processing indicator moving while the report request is pending.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= steps.length - 1) {
          clearInterval(interval);
          return previous;
        }

        return previous + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Animate progress
  useEffect(() => {
    const targetProgress =
      ((currentStep + 1) / steps.length) * 100;

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }

        return Math.min(previous + 2, targetProgress);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentStep]);

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
            AI ENGINE IS WORKING
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Analyzing your job fit
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base leading-7 text-slate-500">
            We&apos;re comparing your resume with the job requirements
            to discover your strengths and opportunities.
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

                {/* <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  className="text-3xl animate-pulse"
                /> */}

                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] text-xs text-white shadow-md">
                  <FontAwesomeIcon icon={faWandSparkles} />
                </span>

              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Intelligent job analysis
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Building your career insights
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100">
                Our AI is working through your resume and job
                description to prepare your personalized report.
              </p>

              {/* Progress */}
              <div className="mt-9 w-full max-w-lg">

                <div className="mb-3 flex items-center justify-between">

                  <span className="text-xs font-medium text-blue-100">
                    Processing progress
                  </span>

                  <span className="text-lg font-bold tabular-nums">
                    {Math.round(progress)}%
                  </span>

                </div>

                <div
                  className="h-3 overflow-hidden rounded-full bg-white/20 p-[2px]"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Simulated processing progress"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-[#F59E0B] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-3 flex justify-between text-[11px] text-blue-200">
                  <span>Analyzing information</span>
                  <span>{currentStep + 1} of {steps.length} stages</span>
                </div>

              </div>
            </div>
          </div>

          {/* Processing steps */}
          <div className="p-5 sm:p-10">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Analysis stages
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Follow the progress of your report
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#1D4ED8]">
                {currentStep + 1}/{steps.length}
              </span>

            </div>

            <div className="space-y-3">

              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div
                    key={step.title}
                    className={`
                      group flex items-center gap-4 rounded-2xl
                      border p-4 transition-all duration-300
                      ${
                        isCurrent
                          ? "border-blue-200 bg-blue-50/80 shadow-sm shadow-blue-100"
                          : isCompleted
                          ? "border-green-100 bg-green-50/40"
                          : "border-slate-100 bg-white"
                      }
                      ${isPending ? "opacity-55" : ""}
                    `}
                  >

                    {/* Step icon */}
                    <div
                      className={`
                        flex h-12 w-12 shrink-0 items-center
                        justify-center rounded-xl transition-all
                        ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isCurrent
                            ? "bg-[#1D4ED8] text-white shadow-md shadow-blue-200"
                            : "bg-slate-100 text-slate-400"
                        }
                      `}
                    >
                      <FontAwesomeIcon
                        icon={isCompleted ? faCircleCheck : step.icon}
                        className={isCurrent ? "animate-pulse" : "text-lg"}
                      />
                    </div>

                    {/* Step information */}
                    <div className="min-w-0 flex-1">

                      <h4
                        className={`text-sm font-bold ${
                          isCurrent
                            ? "text-[#1D4ED8]"
                            : isCompleted
                            ? "text-green-700"
                            : "text-slate-700"
                        }`}
                      >
                        {step.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {step.description}
                      </p>

                    </div>

                    {/* Status */}
                    <div className="shrink-0">

                      {isCompleted && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                          <FontAwesomeIcon icon={faCircleCheck} />
                          <span className="hidden sm:inline">Done</span>
                        </span>
                      )}

                      {isCurrent && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8]">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-[#1D4ED8]" />
                          <span className="hidden sm:inline">Active</span>
                        </span>
                      )}

                      {isPending && (
                        <span className="text-xs font-medium text-slate-400">
                          Waiting
                        </span>
                      )}

                    </div>
                  </div>
                );
              })}

            </div>

            {/* Security information */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#D97706] shadow-sm">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Your information stays protected
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your resume and job information are processed
                  securely to generate your personalized analysis.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <FontAwesomeIcon icon={faWandSparkles} className="text-[#F59E0B]" />
          <span>Please keep this page open while your analysis is being prepared.</span>
        </div>

      </div>
    </main>
  );
}
