import { SkeletonLoader } from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </div>
  );
}
