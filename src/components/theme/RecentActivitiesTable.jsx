import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export default function RecentActivitiesTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        Aucune activité récente
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={activity.student?.avatar} alt={activity.student?.full_name} />
            <AvatarFallback>
              {activity.student?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.student?.full_name}
            </p>
            <p className="text-sm text-muted-foreground">
              a rejoint le cours <span className="font-medium">{activity.course?.title}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary">
              {formatDistanceToNow(new Date(activity.created_at), {
                addSuffix: true,
                locale: fr,
              })}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(activity.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
} 