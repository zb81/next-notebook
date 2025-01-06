import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function NoteListSkeleton() {
  return Array.from({ length: 12 }).map((_, i) => (
    <Card key={i}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-2/3 h-6 rounded-lg" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-1/2 h-[20px]" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-full mt-[6px]" />
        <Skeleton className="h-[14px] w-full mt-[6px]" />
      </CardContent>
    </Card>
  ))
}
