"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useSelector } from "react-redux";

import {
  faFilePdf,
  faBriefcase,
  faMagnifyingGlass,
  faBrain,
  faListCheck,
  faCircleCheck,
  faArrowRight,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function AnalysisProcessingPage() {
  const router = useRouter();


 const { analyzeLoading  } = useSelector(
    (state) => state.analyze
  );


if (!analyzeLoading) {
    router.push("/analyze")
}



  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
      description: "Generating a personalized plan for your preparation.",
      icon: faListCheck,
    },
  ];


  /* =========================
      SIMULATE AI PROCESS
  ========================= */

  useEffect(() => {
    const stepDuration = 1800;

    const interval = setInterval(() => {
      setCurrentStep((previous) => {

        if (previous < steps.length - 1) {
          return previous + 1;
        }

        clearInterval(interval);

        return previous;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);


  /* =========================
      PROGRESS
  ========================= */

  useEffect(() => {
    const targetProgress =
      ((currentStep + 1) / steps.length) * 100;

    const progressInterval = setInterval(() => {
      setProgress((previous) => {

        if (previous >= targetProgress) {
          clearInterval(progressInterval);
          return targetProgress;
        }

        return previous + 2;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [currentStep]);


  /* =========================
      GO TO RESULTS
  ========================= */

  useEffect(() => {
    if (currentStep === steps.length - 1 && progress >= 100) {

      const timeout = setTimeout(() => {
        router.push("/analysis/1");
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [currentStep, progress, router]);




  return (

    analyzeLoading ?
   ( <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">

      <div className="w-full max-w-3xl">

        {/* =========================
            MAIN CARD
        ========================= */}

        <div className="
          bg-white
          rounded-3xl
          border border-slate-200
          shadow-sm
          overflow-hidden
        ">


          {/* =========================
              TOP BLUE SECTION
          ========================= */}

          <div className="
            relative
            overflow-hidden
            bg-[#1D4ED8]
            px-6
            py-10
            sm:px-10
            sm:py-12
            text-white
            text-center
          ">

            {/* Decorative circles */}

            <div className="
              absolute
              -top-24
              -right-24
              w-72
              h-72
              rounded-full
              bg-white/10
            " />

            <div className="
              absolute
              -bottom-32
              -left-20
              w-80
              h-80
              rounded-full
              bg-[#F59E0B]/20
            " />


            <div className="relative z-10">

              {/* AI Icon */}

              <div className="
                mx-auto
                w-16
                h-16
                rounded-2xl
                bg-white/10
                border
                border-white/20
                flex
                items-center
                justify-center
              ">

                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  className="text-2xl animate-pulse"
                />

              </div>


              <p className="
                mt-6
                text-sm
                font-semibold
                text-blue-100
                uppercase
                tracking-wider
              ">
                AI Job Analysis
              </p>


              <h1 className="
                mt-2
                text-3xl
                sm:text-4xl
                font-bold
              ">
                Analyzing your job fit
              </h1>


              <p className="
                mt-3
                text-blue-100
                text-sm
                sm:text-base
                max-w-xl
                mx-auto
                leading-6
              ">
                Our AI is comparing your resume with the
                job requirements to understand how well
                you're prepared.
              </p>


              {/* Progress */}

              <div className="
                mt-8
                max-w-md
                mx-auto
              ">

                <div className="
                  flex
                  items-center
                  justify-between
                  text-xs
                  text-blue-100
                  mb-2
                ">

                  <span>
                    Analysis progress
                  </span>

                  <span>
                    {Math.round(progress)}%
                  </span>

                </div>


                <div className="
                  h-2
                  rounded-full
                  bg-white/20
                  overflow-hidden
                ">

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#F59E0B]
                      transition-all
                      duration-300
                    "
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              PROCESSING STEPS
          ========================= */}

          <div className="p-6 sm:p-10">

            <div className="space-y-2">

              {steps.map((step, index) => {

                const isCompleted =
                  index < currentStep;

                const isCurrent =
                  index === currentStep;

                const isPending =
                  index > currentStep;


                return (
                  <div
                    key={step.title}
                    className={`
                      relative
                      flex
                      items-center
                      gap-4
                      p-4
                      rounded-2xl
                      transition-all
                      duration-500

                      ${
                        isCurrent
                          ? "bg-blue-50 border border-blue-100"
                          : ""
                      }

                      ${
                        isCompleted
                          ? "opacity-80"
                          : ""
                      }

                      ${
                        isPending
                          ? "opacity-40"
                          : ""
                      }
                    `}
                  >


                    {/* Icon */}

                    <div
                      className={`
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        shrink-0
                        transition-all

                        ${
                          isCompleted
                            ? "bg-green-50 text-green-600"
                            : ""
                        }

                        ${
                          isCurrent
                            ? "bg-[#1D4ED8] text-white"
                            : ""
                        }

                        ${
                          isPending
                            ? "bg-slate-100 text-[#64748B]"
                            : ""
                        }
                      `}
                    >

                      {isCompleted ? (

                        <FontAwesomeIcon
                          icon={faCircleCheck}
                        />

                      ) : (

                        <FontAwesomeIcon
                          icon={step.icon}
                          className={
                            isCurrent
                              ? "animate-pulse"
                              : ""
                          }
                        />

                      )}

                    </div>


                    {/* Content */}

                    <div className="flex-1 min-w-0">

                      <h3 className={`
                        text-sm
                        font-semibold
                        ${
                          isCurrent
                            ? "text-[#1D4ED8]"
                            : "text-[#111827]"
                        }
                      `}>
                        {step.title}
                      </h3>


                      <p className="
                        mt-1
                        text-xs
                        sm:text-sm
                        text-[#64748B]
                      ">
                        {step.description}
                      </p>

                    </div>


                    {/* Status */}

                    <div className="shrink-0">

                      {isCompleted && (
                        <span className="
                          text-xs
                          font-semibold
                          text-green-600
                        ">
                          Complete
                        </span>
                      )}


                      {isCurrent && (
                        <div className="
                          flex
                          items-center
                          gap-1
                        ">

                          <span className="
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-[#F59E0B]
                            animate-pulse
                          " />

                          <span className="
                            text-xs
                            font-semibold
                            text-[#F59E0B]
                          ">
                            Working
                          </span>

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>


            {/* =========================
                FOOTER MESSAGE
            ========================= */}

            <div className="
              mt-8
              pt-6
              border-t
              border-slate-100
              flex
              items-start
              gap-3
            ">

              <div className="
                w-9
                h-9
                rounded-lg
                bg-amber-50
                text-[#F59E0B]
                flex
                items-center
                justify-center
                shrink-0
              ">

                <FontAwesomeIcon
                  icon={faCircleCheck}
                />

              </div>


              <div>

                <p className="
                  text-sm
                  font-semibold
                  text-[#111827]
                ">
                  Your data is being analyzed securely
                </p>

                <p className="
                  mt-1
                  text-xs
                  text-[#64748B]
                  leading-5
                ">
                  This may take a few moments while we
                  analyze your resume and job requirements.
                </p>

              </div>

            </div>


            {/* =========================
                RESULT BUTTON
            ========================= */}

            {progress >= 100 && (

              <button
                onClick={() =>
                  router.push("/analysis/1")
                }
                className="
                  mt-6
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-[#1D4ED8]
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-[#1e40af]
                  transition
                "
              >

                View Your Results

                <FontAwesomeIcon
                  icon={faArrowRight}
                />

              </button>

            )}

          </div>

        </div>


        {/* =========================
            BOTTOM TEXT
        ========================= */}

        <p className="
          mt-5
          text-center
          text-xs
          text-[#64748B]
        ">
          Don't close this page while your analysis is
          being prepared.
        </p>

      </div>

    </div>):(
        ""
    )

)
    }
  
