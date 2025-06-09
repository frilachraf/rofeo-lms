import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheckIcon, EyeOff, Clock, Eye, Edit2, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AdminDashboardCoursesTable({ data }) {
    const navigate = useNavigate()

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-6 text-muted-foreground">
                Aucun cours disponible
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {data.map((course) => (
                <div
                    key={course.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {course.title}
                        </p>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={course.teacher?.avatar} alt={course.teacher?.full_name} />
                                <AvatarFallback>
                                    {course.teacher?.full_name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                                {course.teacher?.full_name}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.enrollments?.count || 0} étudiants
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {course.duration} heures
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}