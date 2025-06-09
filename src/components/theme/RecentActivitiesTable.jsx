import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import moment from "moment"

export default function RecentActivitiesTable({ data }) {
    return (
        <div className="relative flex flex-col gap-4 overflow-auto h-full">
            <div className="overflow-hidden rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Étudiant</TableHead>
                            <TableHead className="font-semibold">Cours</TableHead>
                            <TableHead className="font-semibold">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((activity) => (
                            <TableRow key={activity.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={activity.student?.avatar} />
                                            <AvatarFallback className="bg-primary/10">
                                                {activity.student?.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{activity.student?.full_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-primary/10">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        {activity.course?.title}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm text-muted-foreground">
                                        {moment(activity.created_at).fromNow()}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
} 