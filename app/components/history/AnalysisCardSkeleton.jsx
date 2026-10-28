export default function AnalysisCardSkeleton() {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        p-5
        sm:p-6
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
          flex-1
        ">

          {/* File icon */}

          <div className="
            w-12
            h-12
            rounded-xl
            bg-slate-200
            shrink-0
            animate-pulse
          " />

          {/* Job title + company */}

          <div className="
            min-w-0
            flex-1
          ">

            {/* Job title */}

            <div className="
              h-5
              w-3/4
              rounded-md
              bg-slate-200
              animate-pulse
            " />

            {/* Company */}

            <div className="
              mt-3
              flex
              items-center
              gap-2
            ">

              <div className="
                w-3
                h-3
                rounded-full
                bg-slate-200
                animate-pulse
              " />

              <div className="
                h-3
                w-1/2
                rounded-md
                bg-slate-200
                animate-pulse
              " />

            </div>

          </div>

        </div>


        {/* Arrow */}

        <div className="
          w-9
          h-9
          rounded-lg
          bg-slate-100
          shrink-0
          animate-pulse
        " />

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

          {/* Score */}

          <div className="
            w-11
            h-11
            rounded-xl
            bg-slate-200
            animate-pulse
          " />


          {/* Job Match */}

          <div>

            <div className="
              h-3
              w-16
              rounded-md
              bg-slate-200
              animate-pulse
            " />

            <div className="
              mt-2
              h-4
              w-12
              rounded-md
              bg-slate-200
              animate-pulse
            " />

          </div>

        </div>


        {/* Date */}

        <div className="
          flex
          items-center
          gap-2
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-slate-200
            animate-pulse
          " />

          <div className="
            h-3
            w-20
            rounded-md
            bg-slate-200
            animate-pulse
          " />

        </div>

      </div>


      {/* =========================
          SKILLS
      ========================= */}

      <div className="
        mt-5
        flex
        flex-wrap
        gap-2
      ">

        <div className="
          h-7
          w-16
          rounded-lg
          bg-slate-200
          animate-pulse
        " />

        <div className="
          h-7
          w-20
          rounded-lg
          bg-slate-200
          animate-pulse
        " />

        <div className="
          h-7
          w-14
          rounded-lg
          bg-slate-200
          animate-pulse
        " />

        <div className="
          h-7
          w-24
          rounded-lg
          bg-slate-200
          animate-pulse
        " />

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

        <div className="
          h-3
          w-28
          rounded-md
          bg-slate-200
          animate-pulse
        " />

      </div>

    </div>
  );
}