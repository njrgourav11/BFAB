export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fef6eb] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        </div>
        <p className="animate-pulse text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200">
          Loading experience...
        </p>
      </div>
    </div>
  );
}
