import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function NoteListSkeleton() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="mb-3 p-4">
          <Skeleton className="w-full h-7" />
          <Skeleton className="h-5 w-full mt-[6px]" />
        </Card>
      ))}
    </div>
  )
}
