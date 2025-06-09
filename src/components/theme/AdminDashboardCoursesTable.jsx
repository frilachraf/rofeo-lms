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
import { BadgeCheckIcon, EyeOff, Clock, Eye, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AdminDashboardCoursesTable({ data }) {
    const navigate = useNavigate()

    return (
        <div className="relative flex flex-col gap-4 overflow-auto h-full">
            <div className="overflow-hidden rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Cours</TableHead>
                            <TableHead className="font-semibold">Enseignant</TableHead>
                            <TableHead className="font-semibold">Statut</TableHead>
                            <TableHead className="font-semibold">Inscriptions</TableHead>
                            <TableHead className="font-semibold">Durée</TableHead>
                            <TableHead className="text-center font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium line-clamp-1">{item.title}</span>
                                        {/* <span className="text-xs text-muted-foreground line-clamp-1">
                                            {item.description || "Pas de description disponible"}
                                        </span> */}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={item.teacher?.avatar} />
                                            <AvatarFallback className="bg-primary/10">
                                                {item.teacher?.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{item.teacher?.full_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.public ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                        >
                                            <BadgeCheckIcon className="h-3 w-3 mr-1" />
                                            Public
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                                        >
                                            <EyeOff className="h-3 w-3 mr-1" />
                                            Brouillon
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-primary/10">
                                        {item.enrollments?.length || 0} étudiants
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{item.duration} min</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/courses/${item.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/courses/edit/${item.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}