
import { Suspense } from "react";
import AnalysisLayoutContent from "./AnalysisLayoutContent";

export default function AnalysisLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">
            Loading analysis...
          </p>
        </div>
      }
    >
      <AnalysisLayoutContent>
        {children}
      </AnalysisLayoutContent>
    </Suspense>
  );
}
