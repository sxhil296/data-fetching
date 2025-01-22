import { Skeleton } from "./ui/skeleton";

export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[200px] w-[200px] rounded-md" />
      ))}
    </div>
  );
}
