interface LoadingProps {
  massege: string;
  loading: boolean;
}

export function LoadingOverlay({ massege, loading }: LoadingProps) {
  if (!loading) return null;
  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* popup */}
      <div className="relative rounded-2xl bg-background px-6 py-5 shadow-xl flex items-center gap-4">
        {/* spinner */}
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
          aria-hidden="true"
        />
        <div className="text-primary font-medium">{massege}</div>
      </div>
    </div>
  );
}
