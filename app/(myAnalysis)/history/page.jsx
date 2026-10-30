"use client";

import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useDispatch,useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnalysisCardSkeleton from "../../components/history/AnalysisCardSkeleton"
import {
  faMagnifyingGlass,
  faFileLines,
  faArrowRight,
  faCalendarDays,
  faBriefcase,
  faFilter,
  faChevronDown,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {recentUserReport as userReports} from "../../Redux/dashboard/dashboardThunk"
import { formatDate ,slugify } from "../../utils/all";


export default function HistoryPage() {

  const router = useRouter();
  const dispatch=useDispatch()

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

 const {  user,
} = useSelector(
    (state) => state.auth
  );


    const { dashboardLoading: loading,   recentReports: reports = [] } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (!user?._id) return;

    const getReportsData = async () => {
      try {
        await dispatch(userReports({
          id:user?._id,
        })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getReportsData()

},[dispatch,user?._id])

console.log("reports:", reports);
console.log("is array:", Array.isArray(reports));

  /* =========================
      SEARCH
  ========================= */

  const filteredAnalyses = reports?.filter((reports) => {

    const matchesSearch =
      reports.jobRole
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      reports.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      reports.skills.some((skill) =>
        skill
          .toLowerCase()
          .includes(search.toLowerCase())
      );


    /* =========================
        matchmatchScore FILTER
    ========================= */

    const matchesFilter =
      filter === "all" ||

      (filter === "strong" &&
        reports.matchScore >= 80) ||

      (filter === "good" &&
        reports.matchScore >= 60 &&
        reports.matchScore < 80) ||

      (filter === "low" &&
        reports.matchScore < 60);


    return matchesSearch && matchesFilter;
  });


 

  /* =========================
      matchScore COLOR
  ========================= */

  const getmatchScoreColor = (matchScore) => {

    if (matchScore >= 80) {
      return {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-100",
      };
    }

    if (matchScore >= 60) {
      return {
        text: "text-[#F59E0B]",
        bg: "bg-amber-50",
        border: "border-amber-100",
      };
    }

    return {
      text: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    };
  };


  /* =========================
      matchmatchScore STATUS
  ========================= */

  const getStatusIcon = (matchScore) => {

    if (matchScore >= 80) {
      return faCircleCheck;
    }

    return faTriangleExclamation;
  };


  return (

    <div className="max-w-7xl mx-10 md:mx-auto my-10">


      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="mb-8">

        <p className="
          text-sm
          font-semibold
          text-[#F59E0B]
          uppercase
          tracking-wide
        ">
          Your Analyses
        </p>


        <div className="
          mt-2
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-4
        ">

          <div>

            <h1 className="
              text-3xl
              sm:text-4xl
              font-bold
              text-[#111827]
            ">
              Analysis History
            </h1>


            <p className="
              mt-2
              text-[#64748B]
              max-w-2xl
            ">
              View and revisit all of your previous
              job fit analyses.
            </p>

          </div>


          {/* New Analysis */}

          <button
            onClick={() => router.push("/analyze")}
            className="
              inline-flex
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
              shadow-sm
              hover:bg-[#1e40af]
              transition
            "
          >

            <span className="text-lg">
              +
            </span>

            New Analysis

          </button>

        </div>

      </section>


      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <section className="
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        p-4
        sm:p-5
        mb-6
      ">

        <div className="
          flex
          flex-col
          md:flex-row
          gap-3
        ">


          {/* Search */}

          <div className="relative flex-1">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#64748B]
                text-sm
              "
            />


            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="
                Search by job title, company or skill...
              "
              className="
                w-full
                h-11
                rounded-xl
                border border-slate-200
                bg-white
                pl-11
                pr-4
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

          </div>


          {/* Filter */}

          <div className="relative">

            <FontAwesomeIcon
              icon={faFilter}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#64748B]
                text-xs
                pointer-events-none
              "
            />


            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className="
                h-11
                w-full
                md:w-48
                appearance-none
                rounded-xl
                border border-slate-200
                bg-white
                pl-10
                pr-10
                text-sm
                text-[#111827]
                outline-none
                cursor-pointer
                focus:border-[#1D4ED8]
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            >

              <option value="all">
                All Matches
              </option>

              <option value="strong">
                Strong Match
              </option>

              <option value="good">
                Good Match
              </option>

              <option value="low">
                Needs Improvement
              </option>

            </select>


            <FontAwesomeIcon
              icon={faChevronDown}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#64748B]
                text-xs
                pointer-events-none
              "
            />

          </div>

        </div>

      </section>


      {/* =========================
          RESULTS COUNT
      ========================= */}

      <div className="
        flex
        items-center
        justify-between
        mb-4
      ">

        <p className="
          text-sm
          text-[#64748B]
        ">

          Showing{" "}

          <span className="
            font-semibold
            text-[#111827]
          ">
            {filteredAnalyses.length}
          </span>{" "}

          {filteredAnalyses.length === 1
            ? "analysis"
            : "analyses"}

        </p>

      </div>


      {/* =========================
          ANALYSIS CARDS
      ========================= */}

     {loading ? (

  /* =========================
      LOADING STATE
  ========================= */

  <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-5
  ">
    {Array.from({ length: 6 }).map((_, index) => (
      <AnalysisCardSkeleton key={index} />
    ))}
  </div>

) : filteredAnalyses.length > 0 ? (

  /* =========================
      ANALYSES
  ========================= */

  <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-5
  ">

    {filteredAnalyses.map((reports) => {

      const matchScoreColor =
        getmatchScoreColor(reports.matchScore);

      return (

        <div
          key={reports._id}
          type="button"
           onClick={() =>
                    router.push(`/analysis/${slugify(reports.jobRole)}/${reports._id}?from=history`)
              }
          className="
            group
            w-full
            text-left
            bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5
            sm:p-6
            hover:border-blue-200
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all
            duration-200
            cursor-pointer
          "
        >

          {/* =========================
              TOP ROW
          ========================= */}

          <div className="
            flex
            items-start
            justify-between
            gap-4
          ">

            {/* Job information */}

            <div className="
              flex
              items-start
              gap-4
              min-w-0
            ">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-blue-50
                text-[#1D4ED8]
                flex
                items-center
                justify-center
                shrink-0
                group-hover:bg-[#1D4ED8]
                group-hover:text-white
                transition
              ">

                <FontAwesomeIcon
                  icon={faFileLines}
                />

              </div>

              <div className="min-w-0">

                <h2 className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-[#111827]
                  truncate
                ">
                  {reports.jobRole}
                </h2>

                <div className="
                  mt-1
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-[#64748B]
                ">

                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-xs"
                  />

                  <span className="truncate">
                    {reports.company}
                  </span>

                </div>

              </div>

            </div>

            {/* Arrow */}

            <div className="
              w-9
              h-9
              rounded-lg
              bg-slate-50
              text-[#64748B]
              flex
              items-center
              justify-center
              group-hover:bg-blue-50
              group-hover:text-[#1D4ED8]
              transition
              shrink-0
            ">

              <FontAwesomeIcon
                icon={faArrowRight}
                className="
                  text-sm
                  group-hover:translate-x-0.5
                  transition-transform
                "
              />

            </div>

          </div>

          {/* =========================
              DIVIDER
          ========================= */}

          <div className="
            my-5
            border-t
            border-slate-100
          " />

          {/* =========================
              MATCH SCORE + DATE
          ========================= */}

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          ">

            {/* Match Score */}

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className={`
                w-11
                h-11
                rounded-xl
                ${matchScoreColor.bg}
                ${matchScoreColor.text}
                flex
                items-center
                justify-center
                font-bold
              `}>

                {reports.matchScore}%

              </div>

              <div>

                <p className="
                  text-xs
                  text-[#64748B]
                ">
                  Job Match
                </p>

                <div className={`
                  mt-0.5
                  flex
                  items-center
                  gap-1.5
                  text-sm
                  font-semibold
                  ${matchScoreColor.text}
                `}>

                  <FontAwesomeIcon
                    icon={getStatusIcon(
                      reports.matchScore
                    )}
                    className="text-xs"
                  />

                  {reports.matchScore}

                </div>

              </div>

            </div>

            {/* Date */}

            <div className="
              flex
              items-center
              gap-2
              text-xs
              text-[#64748B]
            ">

              <FontAwesomeIcon
                icon={faCalendarDays}
              />

              {formatDate(reports.createdAt)}

            </div>

          </div>

          {/* =========================
              SKILLS
          ========================= */}

          <div
  className="
  mt-5
    flex
    flex-wrap
    items-start
    content-start
    gap-2
    md:min-h-40
    overflow-y-auto
  "
>
  {reports.skillGap.map((skill) => (
    <div
      key={skill.skill}
      className="
        shrink-0
        w-fit
        px-2.5
        py-1
        rounded-lg
        bg-slate-100
        text-[#64748B]
        text-xs
        font-medium
      "
    >
      {skill.skill}
    </div>
  ))}
</div>

          {/* =========================
              VIEW REPORT
          ========================= */}

          <div className="
            mt-5
            pt-4
            border-t
            border-slate-100
            flex
            items-center
            justify-between
          ">

            <span className="
              text-xs
              font-semibold
              text-[#64748B]
              group-hover:text-[#1D4ED8]
              transition
            ">
              View full Analysis
            </span>

          </div>

        </div>

      );
    })}

  </div>

) : (

  /* =========================
      EMPTY STATE
  ========================= */

  <div className="
    bg-white
    rounded-2xl
    border border-slate-200
    shadow-sm
    p-10
    sm:p-16
    text-center
  ">

    <div className="
      mx-auto
      w-16
      h-16
      rounded-2xl
      bg-blue-50
      text-[#1D4ED8]
      flex
      items-center
      justify-center
    ">

      <FontAwesomeIcon
        icon={faFileLines}
        className="text-xl"
      />

    </div>

    <h2 className="
      mt-5
      text-lg
      font-bold
      text-[#111827]
    ">
      No analyses found
    </h2>

    <p className="
      mt-2
      text-sm
      text-[#64748B]
      max-w-md
      mx-auto
    ">
      {search
        ? "Try searching with a different job title, company or skill."
        : "You haven't analyzed any jobs yet. Start your first analysis to see your results here."
      }
    </p>

  </div>
)}

</div>
  )
}