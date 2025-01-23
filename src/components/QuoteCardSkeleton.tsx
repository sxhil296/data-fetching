import { Skeleton } from "./ui/skeleton";

export const QuoteCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <Skeleton className="h-6 w-[100px]  rounded-md" />
      <Skeleton className="h-24 w-[300px]  rounded-md" />
      <div className="flex justify-end">
        <Skeleton className="h-6 w-[100px]  rounded-md" />
      </div>
    </div>
  );
};
