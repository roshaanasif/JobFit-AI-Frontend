"use client";

import { useRef, useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useDispatch  } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {generatingAiResponse} from "../../Redux/analyze/analyzeThunk"
import {
  faFilePdf,
  faCloudArrowUp,
  faTrash,
  faImage,
  faAlignLeft,
  faBriefcase,
  faArrowRight,
  faCircleInfo,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function NewAnalysisPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const resumeInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [resume, setResume] = useState(null);

  const [jobDescriptionType, setJobDescriptionType] =
    useState("text");

  const [jobDescription, setJobDescription] = useState("");

  const [jobDescriptionImage, setJobDescriptionImage] =
    useState(null);

  const [additionalDescription, setAdditionalDescription] =
    useState("");

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  if (error) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [error]);
  /* =========================
      RESUME UPLOAD
  ========================= */

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // PDF validation
    if (file.type !== "application/pdf") {
      setError("Please upload your resume in PDF format only.");
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume file size must be less than 5MB.");
      return;
    }

    setResume(file);
  };

  /* =========================
      JOB DESCRIPTION IMAGE
  ========================= */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a JPG, PNG, or WEBP image."
      );
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Job description image must be less than 5MB."
      );
      return;
    }

    setJobDescriptionImage(file);
  };

  /* =========================
      REMOVE RESUME
  ========================= */

  const removeResume = () => {
    setResume(null);

    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  /* =========================
      REMOVE IMAGE
  ========================= */

  const removeImage = () => {
    setJobDescriptionImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  /* =========================
      SUBMIT
  ========================= */

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  // Prevent duplicate submissions
  if (isSubmitting) return;

  /* =========================
      RESUME VALIDATION
  ========================= */

  if (!resume) {
    setError("Please upload your resume first.");
    return;
  }

  /* =========================
      JOB DESCRIPTION VALIDATION
  ========================= */

  if (
    jobDescriptionType === "text" &&
    !jobDescription.trim()
  ) {
    setError("Please enter the job description.");
    return;
  }

  if (
    jobDescriptionType === "image" &&
    !jobDescriptionImage
  ) {
    setError(
      "Please upload the job description image."
    );
    return;
  }

  try {
    setIsSubmitting(true);

    /* =========================
        CREATE FORM DATA
    ========================= */

    // const formData = new FormData();

    // // Resume
    // formData.append("resume", resume);

    // // Job description
    // formData.append(
    //   "jobDescription",
    //   jobDescription.trim()
    // );

    // // Additional information
    // formData.append(
    //   "description",
    //   additionalDescription.trim()
    // );

    /* =========================
        SEND TO REDUX
    ========================= */

    await dispatch(
      generatingAiResponse({
        resume,
        jobDescription,
        description:additionalDescription
      })
    ).unwrap();

    /* =========================
        SUCCESS
    ========================= */

    router.push("/analyze/processing");

  } catch (error) {
    console.error(
      "Job analysis submission error:",
      error
    );

    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message ||
          "Something went wrong while analyzing your job fit.";

    setError(errorMessage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } finally {
    setIsSubmitting(false);
  }
};
  
  
 
  

  return (
    <div className="w-full h-fit bg-[#F9FAFB]">
    <div className="max-w-5xl  mx-auto my-10">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="mb-8">

        <p className="text-sm font-semibold text-[#F59E0B] uppercase tracking-wide">
          Job Analysis
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111827]">
          Analyze a new job
        </h1>

        <p className="mt-2 text-[#64748B] max-w-2xl">
          Upload your resume and provide the job description.
          Our AI will compare your profile with the job and
          create a personalized preparation plan.
        </p>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            border border-red-200
            bg-red-50
            text-red-600
            text-sm
            flex items-start gap-3
          "
        >

          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mt-0.5"
          />

          <p>{error}</p>

        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* =========================
            RESUME SECTION
        ========================= */}

        <section
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5 sm:p-7
            mb-6
          "
        >

          {/* Section heading */}

          <div className="flex items-start gap-4 mb-6">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-blue-50
                text-[#1D4ED8]
                flex items-center justify-center
                shrink-0
              "
            >

              <FontAwesomeIcon icon={faFilePdf} />

            </div>

            <div>

              <h2 className="text-lg font-bold text-[#111827]">
                Your Resume
              </h2>

              <p className="text-sm text-[#64748B] mt-1">
                Upload the latest version of your resume.
              </p>

            </div>

          </div>

          {/* Hidden input */}

          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleResumeChange}
            className="hidden"
          />

          {!resume ? (

            /* Upload area */

            <button
              type="button"
              onClick={() =>
                resumeInputRef.current?.click()
              }
              className="
                w-full
                border-2
                border-dashed
                border-slate-200
                hover:border-[#1D4ED8]
                hover:bg-blue-50/40
                rounded-2xl
                p-8 sm:p-12
                transition
                group
              "
            >

              <div
                className="
                  mx-auto
                  w-14 h-14
                  rounded-2xl
                  bg-blue-50
                  text-[#1D4ED8]
                  flex items-center justify-center
                  group-hover:bg-[#1D4ED8]
                  group-hover:text-white
                  transition
                "
              >

                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className="text-xl"
                />

              </div>

              <h3
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-[#111827]
                "
              >
                Upload your resume
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#64748B]
                "
              >
                Click to browse or drag and drop your PDF
              </p>

              <p
                className="
                  mt-3
                  text-xs
                  text-[#64748B]
                "   
              >
                PDF only • Maximum 5MB
              </p>

            </button>

          ) : (

            /* Resume preview */

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                p-4
                rounded-xl
                bg-slate-50
                border border-slate-200
              "
            >

              <div className="flex items-center gap-4 min-w-0">

                <div
                  className="
                    w-12 h-12
                    rounded-xl
                    bg-red-50
                    text-red-500
                    flex items-center justify-center
                    shrink-0
                  "
                >

                  <FontAwesomeIcon icon={faFilePdf} />

                </div>

                <div className="min-w-0">

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#111827]
                      truncate
                    "
                  >
                    {resume.name}
                  </p>

                  <p
                    className="
                      text-xs
                      text-[#64748B]
                      mt-1
                    "
                  >
                    {(resume.size / 1024 ).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={removeResume}
                className="
                  w-9 h-9
                  rounded-lg
                  text-[#64748B]
                  hover:bg-red-50
                  hover:text-red-500
                  transition
                  shrink-0
                "
              >

                <FontAwesomeIcon icon={faTrash} />

              </button>

            </div>

          )}

        </section>

        {/* =========================
            JOB DESCRIPTION
        ========================= */}

        <section
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5 sm:p-7
            mb-6
          "
        >

          {/* Heading */}

          <div className="flex items-start gap-4 mb-6">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-blue-50
                text-[#1D4ED8]
                flex items-center justify-center
                shrink-0
              "
            >

              <FontAwesomeIcon icon={faBriefcase} />

            </div>

            <div>

              <h2 className="text-lg font-bold text-[#111827]">
                Job Description
              </h2>

              <p className="text-sm text-[#64748B] mt-1">
                Add the job description as text or upload
                an image.
              </p>

            </div>

          </div>

          {/* Tabs */}

          <div
            className="
              flex
              p-1
              bg-slate-100
              rounded-xl
              mb-5
              max-w-sm
            "
          >

            <button
              type="button"
              onClick={() => {
                setJobDescriptionType("text");
                setError("");
              }}
              className={`
                flex-1
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition

                ${
                  jobDescriptionType === "text"
                    ? "bg-white text-[#1D4ED8] shadow-sm"
                    : "text-[#64748B] hover:text-[#111827]"
                }
              `}
            >

              <FontAwesomeIcon icon={faAlignLeft} />

              Text

            </button>

            <button
              type="button"
              onClick={() => {
                setJobDescriptionType("image");
                setError("");
              }}
              className={`
                flex-1
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition

                ${
                  jobDescriptionType === "image"
                    ? "bg-white text-[#1D4ED8] shadow-sm"
                    : "text-[#64748B] hover:text-[#111827]"
                }
              `}
            >

              <FontAwesomeIcon icon={faImage} />

              Image

            </button>

          </div>

          {/* =========================
              TEXT MODE
          ========================= */}

          {jobDescriptionType === "text" && (

            <div>

              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-[#111827]
                  mb-2
                "
              >
                Paste job description
              </label>

              <textarea
                value={jobDescription}
                onChange={(event) =>
                  setJobDescription(event.target.value)
                }
                placeholder="
                  Paste the complete job description here...
                  Include responsibilities, requirements, skills,
                  experience and qualifications.
                "
                rows={12}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-4 py-3
                  text-sm
                  text-[#111827]
                  placeholder:text-slate-400
                  outline-none
                  focus:border-[#1D4ED8]
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

              <div
                className="
                  flex
                  justify-between
                  mt-2
                  text-xs
                  text-[#64748B]
                "
              >

                <span>
                  Include as much detail as possible.
                </span>

                <span>
                  {jobDescription.length} characters
                </span>

              </div>

            </div>

          )}

          {/* =========================
              IMAGE MODE
          ========================= */}

          {jobDescriptionType === "image" && (

            <div>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              {!jobDescriptionImage ? (

                <button
                  type="button"
                  onClick={() =>
                    imageInputRef.current?.click()
                  }
                  className="
                    w-full
                    border-2
                    border-dashed
                    border-slate-200
                    hover:border-[#1D4ED8]
                    hover:bg-blue-50/40
                    rounded-2xl
                    p-8 sm:p-12
                    transition
                    group
                  "
                >

                  <div
                    className="
                      mx-auto
                      w-14 h-14
                      rounded-2xl
                      bg-blue-50
                      text-[#1D4ED8]
                      flex items-center justify-center
                      group-hover:bg-[#1D4ED8]
                      group-hover:text-white
                      transition
                    "
                  >

                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-xl"
                    />

                  </div>

                  <h3
                    className="
                      mt-4
                      text-sm
                      font-semibold
                      text-[#111827]
                    "
                  >
                    Upload job description image
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-[#64748B]
                    "
                  >
                    Upload a screenshot or image of the
                    job description.
                  </p>

                  <p
                    className="
                      mt-3
                      text-xs
                      text-[#64748B]
                    "
                  >
                    JPG, PNG or WEBP • Maximum 5MB
                  </p>

                </button>

              ) : (

                <div
                  className="
                    rounded-2xl
                    border border-slate-200
                    overflow-hidden
                    bg-slate-50
                  "
                >

                  {/* Image preview */}

                  <div className="p-4">

                    <img
                      src={URL.createObjectURL(
                        jobDescriptionImage
                      )}
                      alt="Job description preview"
                      className="
                        w-full
                        max-h-[500px]
                        object-contain
                        rounded-xl
                        bg-white
                        border border-slate-200
                      "
                    />

                  </div>

                  {/* Image information */}

                  <div
                    className="
                      px-4 py-3
                      border-t border-slate-200
                      flex items-center
                      justify-between
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        min-w-0
                      "
                    >

                      <div
                        className="
                          w-9 h-9
                          rounded-lg
                          bg-blue-50
                          text-[#1D4ED8]
                          flex items-center
                          justify-center
                          shrink-0
                        "
                      >

                        <FontAwesomeIcon icon={faImage} />

                      </div>

                      <p
                        className="
                          text-sm
                          font-medium
                          text-[#111827]
                          truncate
                        "
                      >
                        {jobDescriptionImage.name}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="
                        w-9 h-9
                        rounded-lg
                        text-[#64748B]
                        hover:bg-red-50
                        hover:text-red-500
                        transition
                        shrink-0
                      "
                    >

                      <FontAwesomeIcon icon={faTrash} />

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </section>

        {/* =========================
            ADDITIONAL DESCRIPTION
        ========================= */}

        <section
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5 sm:p-7
            mb-6
          "
        >

          <div className="flex items-start gap-4 mb-6">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-amber-50
                text-[#F59E0B]
                flex items-center justify-center
                shrink-0
              "
            >

              <FontAwesomeIcon icon={faAlignLeft} />

            </div>

            <div>

              <h2 className="text-lg font-bold text-[#111827]">
                Additional Information
              </h2>

              <p className="text-sm text-[#64748B] mt-1">
                Add any extra context about the job.
                This field is optional.
              </p>

            </div>

          </div>

          <textarea
            value={additionalDescription}
            onChange={(event) =>
              setAdditionalDescription(
                event.target.value
              )
            }
            placeholder="
              For example:
              - The company is looking for a backend developer.
              - The interview is next week.
              - I have limited experience with PostgreSQL.
              - I want to focus on technical interview preparation.
            "
            rows={7}
            className="
              w-full
              resize-none
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-3
              text-sm
              text-[#111827]
              placeholder:text-slate-400
              outline-none
              focus:border-[#F59E0B]
              focus:ring-4
              focus:ring-amber-100
              transition
            "
          />

        </section>

        {/* =========================
            SUBMIT SECTION
        ========================= */}

        <section
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5 sm:p-7
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-5
            "
          >

            {/* Information */}

            <div className="flex items-start gap-3">

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-blue-50
                  text-[#1D4ED8]
                  flex items-center
                  justify-center
                  shrink-0
                "
              >

                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#111827]
                  "
                >
                  Ready to analyze your job fit?
                </p>

                <p
                  className="
                    text-xs
                    text-[#64748B]
                    mt-1
                  "
                >
                  Our AI will analyze your resume against
                  the provided job description.
                </p>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                bg-[#1D4ED8]
                text-white
                text-sm
                font-semibold
                shadow-sm
                hover:bg-[#1e40af]
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
                shrink-0
              "
            >

              {isSubmitting ? (

                <>
                  <span
                    className="
                      w-4
                      h-4
                      border-2
                      border-white/40
                      border-t-white
                      rounded-full
                      animate-spin
                    "
                  />

                  <span>
                    Analyzing...
                  </span>
                </>

              ) : (

                <>
                  <span>
                    Analyze Job Fit
                  </span>

                  <FontAwesomeIcon
                    icon={faArrowRight}
                  />
                </>

              )}

            </button>

          </div>

        </section>

      </form>

    </div>
    </div>
  );
}