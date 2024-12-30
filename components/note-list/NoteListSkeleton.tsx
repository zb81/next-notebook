import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function NoteListSkeleton() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="mb-3 p-4">
          <Skeleton className="w-1/3 h-6 rounded-lg" />

          <Skeleton className="w-1/6 h-[14px] mt-[6px]" />

          <Skeleton className="h-[14px] w-full mt-[6px]" />
          <Skeleton className="h-[14px] w-full mt-[6px]" />
        </Card>
      ))}
    </div>
  )
}
