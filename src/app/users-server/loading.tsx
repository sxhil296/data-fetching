import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUsers(){
    return (
        <div className="flex justify-center items-center py-10">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
    )
}