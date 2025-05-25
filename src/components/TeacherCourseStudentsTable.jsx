import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TeacherCourseStudentsTable({ students }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apprenants inscrits</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l’élève</TableHead>
              <TableHead>Niveau</TableHead>
              <TableHead>Établissement</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Date d’inscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <img
                      src={student.student.avatar || "https://avatar.iran.liara.run/public/boy"}
                      alt={student.student.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                    {student.student.full_name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{student.student.level}</Badge>
                </TableCell>
                <TableCell>{student.student.school}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={student.course.thumbnail}
                      alt={student.course.title}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {student.course.title}
                  </div>
                </TableCell>
                <TableCell>{student.course.duration} min</TableCell>
                <TableCell>
                  {new Date(student.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 