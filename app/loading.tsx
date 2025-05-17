"use client";

export function LoadingProgress() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingProgress />
    </div>
  );
}
