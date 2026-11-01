"use client";

import { useRouter } from "next/navigation";
import { useSelector,useDispatch } from "react-redux";
import {useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileLines,
  faChartLine,
  faCircleCheck,
  faTriangleExclamation,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {recentUserReport, KpiUser} from "../../Redux/dashboard/dashboardThunk"
import { formatDate ,slugify } from "../../utils/all";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {  user,
    loading,
  initialized,
  initialLoading,
  initialError,} = useSelector(
    (state) => state.auth
  );

  const { dashboardLoading ,kpi, recentReports } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (!user?._id) return;

    const getDashboardData = async () => {
      try {
        await dispatch(KpiUser()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    const getrecentReportsData = async () => {
      try {
        await dispatch(recentUserReport({
          id:user?._id,
          recent:true,
        })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getDashboardData();
    getrecentReportsData()

  }, [user?._id, dispatch]);

  if (!initialized || initialLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  






  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          WELCOME
      ========================= */}
      <section className="mb-8">

        <p className="text-sm font-semibold text-[#F59E0B] uppercase tracking-wide">
          Dashboard
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#111827]">
              {loading ? "loading... " : `Welcome back, ${user?.name}`} 👋
            </h1>

            <p className="mt-2 text-[#64748B] max-w-2xl">
              Analyze how well your resume matches your next job and discover
              the skills you need to improve.
            </p>

          </div>

          <button
            onClick={() => router.push("/analyze")}
            className="
              inline-flex items-center justify-center
              gap-2
              px-5 py-3
              rounded-xl
              bg-[#1D4ED8]
              text-white
              font-semibold
              text-sm
              shadow-sm
              hover:bg-[#1e40af]
              transition
            "
          >
            <FontAwesomeIcon icon={faPlus} />
            New Analysis
          </button>

        </div>

      </section>


      {/* =========================
          MAIN CTA
      ========================= */}
      <section className="relative overflow-hidden bg-[#1D4ED8] rounded-3xl p-6 sm:p-8 mb-8 text-white">

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#F59E0B]/20" />

        <div className="relative z-10 max-w-2xl">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-5">

            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />

            AI Job Analysis

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Find out if you're ready for your next job.
          </h2>

          <p className="mt-3 text-blue-100 leading-7">
            Upload your resume and add the job description. Our AI will
            calculate your match score, identify skill gaps, create a
            preparation plan, and generate technical interview questions.
          </p>

          <button
            onClick={() => router.push("/analyze")}
            className="
              mt-6
              px-5 py-3
              rounded-xl
              bg-white
              text-[#1D4ED8]
              font-semibold
              text-sm
              hover:bg-blue-50
              transition
            "
          >
            Analyze a Job 
             <FontAwesomeIcon icon={faArrowRight} />
          </button>

        </div>

      </section>


      {/* =========================
          STATISTICS
      ========================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          label="Total Analyses"
          value={kpi?.stats?.totalAnalyses ?? 0}
          description="Jobs analyzed"
          icon={faFileLines}
          loading={dashboardLoading}
        />

        <StatCard
          label="Average Match"
          value={`${kpi?.stats?.averageMatch ?? 0}%`}
          description="Across all jobs"
          icon={faChartLine}
          accent
          loading={dashboardLoading}

        />

        <StatCard
          label="Strong Matches"
          value={kpi?.stats?.strongMatches ?? 0}
          description="Above 80%"
          icon={faCircleCheck}
          loading={dashboardLoading}

        />

        <StatCard
          label="Skill Gaps"
          value={kpi?.stats?.skillGaps ?? 0}
          description="Skills to improve"
          icon={faTriangleExclamation}
          warning
          loading={dashboardLoading}

        />

      </section>


      {/* =========================
          RECENT ANALYSES
      ========================= */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>

            <h2 className="text-lg font-bold text-[#111827]">
              Recent Analyses
            </h2>

            <p className="text-sm text-[#64748B] mt-1">
              Your latest job fit reports
            </p>

          </div>

       {recentReports?.length > 0 ?
         ( <button
            onClick={() => router.push("/history")}
            className="
              text-sm
              font-semibold
              text-[#1D4ED8]
              hover:text-[#1e40af]
            "
          >
            View all →
          </button>):""}

        </div>


        {/* Analysis List */}
        <div className="divide-y divide-slate-100">

          {recentReports?.length > 0 ? (
              recentReports?.map((analysis) => (

            <div
              key={analysis._id}
               onClick={() =>
                    router.push(`/analysis/${slugify(analysis.jobRole)}/${analysis._id}?from=dashboard`)
                  }
              className="
                p-5 sm:p-6
                flex flex-col md:flex-row
                md:items-center
                justify-between
                gap-5
                hover:bg-slate-50
                transition
              "
            >

              {/* Job */}
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold">
                  {analysis.jobRole?.split("")?.[0]}
                </div>

                <div>

                  <h3 className="font-semibold text-[#111827]">
                    {analysis.jobRole}
                  </h3>

                  <p className="text-sm text-[#64748B] mt-1">
                    {analysis.company}
                  </p>

                </div>

              </div>


              {/* Score */}
              <div className="flex items-center gap-6">

                <div className="text-left md:text-right">

                  <p className="text-xs text-[#64748B]">
                    Match Score
                  </p>

                  <p
                    className={`
                      text-xl font-bold
                      ${
                        analysis.matchScore >= 80
                          ? "text-green-600"
                          : analysis.matchScore >= 60
                          ? "text-[#F59E0B]"
                          : "text-red-500"
                      }
                    `}
                  >
                    {analysis.matchScore}%
                  </p>

                </div>

                <div className="hidden sm:block text-xs text-[#64748B]">
                  {formatDate(analysis?.createdAt)}
                </div>

                <button
                  onClick={() =>
                    router.push(`/analysis/${slugify(analysis.jobRole)}/${analysis._id}?from=dashboard`)
                  }
                  className="
                    px-4 py-2
                    rounded-lg
                    border border-slate-200
                    text-sm
                    font-semibold
                    text-[#111827]
                    hover:border-[#1D4ED8]
                    hover:text-[#1D4ED8]
                    transition
                  "
                >
                  View
                </button>

              </div>

            </div>

         ))):(
           <div className="py-12 px-6 text-center">

      <div className="mx-auto w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
        <FontAwesomeIcon icon={faFileLines} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#111827]">
        No recent reports
      </h3>

      <p className="mt-1 text-sm text-[#64748B]">
        Your latest job analysis reports will appear here.
      </p>

      <button
        onClick={() => router.push("/analyze")}
        className="
          mt-5
          inline-flex items-center gap-2
          px-4 py-2
          rounded-lg
          bg-[#1D4ED8]
          text-white
          text-sm
          font-semibold
          hover:bg-[#1e40af]
          transition
        "
      >
        <FontAwesomeIcon icon={faPlus} />
        Analyze a Job
      </button>

    </div>
  )}


       </div>

      </section>

    </div>
  );
}


/* =========================
   STAT CARD
========================= */


function StatCard({
  label,
  value,
  description,
  icon,
  accent,
  warning,
  loading
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          {loading ? (
            <div className="mt-2 h-3 w-28 bg-slate-200 rounded animate-pulse" />
          ) : (
          <p className="text-sm text-[#64748B]">
            {label}
          </p>
          )}

          {loading ? (
            <div className="mt-2 h-3 w-28 bg-slate-200 rounded animate-pulse" />
          ) : (
          <p className="mt-2 text-3xl font-bold text-[#111827]">
            {value}
          </p>)}

          {loading ? (
            <div className="mt-2 h-3 w-28 bg-slate-200 rounded animate-pulse" />
          ) : (
          <p className="mt-1 text-xs text-[#64748B]">
            {description}
          </p>)}
        </div>

        <div
          className={`
            w-10 h-10
            rounded-xl
            flex items-center justify-center

            ${
              warning
                ? "bg-amber-50 text-[#F59E0B]"
                : accent
                ? "bg-blue-50 text-[#1D4ED8]"
                : "bg-slate-100 text-[#64748B]"
            }
          `}
        >
          <FontAwesomeIcon icon={icon} className="text-lg" />
        </div>

      </div>

    </div>
  );
}