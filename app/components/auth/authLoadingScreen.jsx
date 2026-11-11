
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
export default function AuthLoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#F8FAFC] px-6"
      role="status"
      aria-live="polite"
      aria-label="Loading your account"
    >
      {/* Background decorations */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />

      {/* Loading Card */}
      <div className="relative w-full max-w-sm rounded-3xl border border-slate-100 bg-white/90 px-8 py-10 text-center shadow-[0_20px_70px_-25px_rgba(29,78,216,0.18)] backdrop-blur-xl">

        {/* Logo */}
        
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8] text-white">
                  <FontAwesomeIcon icon={faBriefcase} />
            </div>

        {/* Brand */}
        <h1 className="mt-5 text-lg font-bold tracking-tight text-[#111827]">
          Job Fit <span className="text-[#1D4ED8]">AI</span>
        </h1>

        <p className="mt-2 text-xl font-semibold tracking-tight text-[#111827]">
          Getting things ready
        </p>

        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          We&apos;re securely loading your account. Just a moment!
        </p>

        {/* Loading Animation */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1D4ED8] [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-300" />
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-xs font-medium tracking-wide text-[#94A3B8]">
          AI-POWERED CAREER ASSISTANT
        </p>
      </div>
    </div>
  );
}
