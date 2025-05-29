import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "@/components/ui/progress"
import { ClockCountdown, UserCircle } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export default function CourseCard({ course }) {
  return (
    <Card className="w-full rounded-2xl duration-300 overflow-hidden shadow-none pt-0">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full min-h-48 max-h-48 object-cover border bg-white"
      />
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold truncate">
          {course.title}
        </CardTitle>
        {/* <Badge variant="outline" className="mt-1 capitalize w-fit">
          {course?.category?.name}
        </Badge> */}
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{course.total_enrollments} Enrolled</span>
          <span>{course.duration} hrs</span>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          By {course?.teacher?.full_name}
        </p>
      </CardContent>
      <CardFooter className="flex ">
        <Button className="w-full">
          View Course
        </Button>
      </CardFooter>
    </Card>
  )
}

export function StudentCourseCard({ course }) {
  const progress = course.enrollment_progress?.length / course.details?.lessons?.length * 100 || 0;
  return (
    <Card className="w-full rounded-2xl duration-300 overflow-hidden shadow-none pt-0">
      <img
        src={course.details.thumbnail || 'https://picsum.photos/200/300'}
        alt={course.details.title}
        className="w-full min-h-48 max-h-48 object-cover border bg-white"
      />
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold truncate">
          {course.details.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.details.description}
        </p>
        {/* <Badge variant="outline" className="mt-1 capitalize w-fit">
          {course?.category?.name}
        </Badge> */}
      </CardHeader>
      <CardContent className="sm:h-full">

        <div className="flex justify-between items-center mb-4">
          <p className="flex text-sm text-muted-foreground items-center gap-2">
            <ClockCountdown size={18} />
            <span>{course.details.duration} minutes</span>
          </p>
          <p className="text-sm text-muted-foreground text-right flex items-center gap-2">
            <UserCircle size={18} />
            <span className="truncate capitalize">
              By {course?.teacher?.full_name}
            </span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {progress}%

        </p>
        <Progress value={progress} />
      </CardContent>

      <CardFooter className="flex ">
        <Link to={`/student/courses/${course.id}/content`}>
          <Button className="w-full">
            Continue
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
export function PublicCourseCard({ course, onEnroll }) {
  return (
    <Card className="w-full rounded-2xl duration-300 overflow-hidden shadow-none pt-0">
      <img
        src={course?.thumbnail || 'https://picsum.photos/200/300'}
        alt={course?.title}
        className="w-full min-h-48 max-h-48 object-cover border bg-white"
      />
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold truncate">
          {course?.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course?.description}
        </p>
        {/* <Badge variant="outline" className="mt-1 capitalize w-fit">
          {course?.category?.name}
        </Badge> */}
      </CardHeader>
      <CardContent className="sm:h-full">

        <div className="flex justify-between items-center mb-4">
          <p className="flex text-sm text-muted-foreground items-center gap-2">
            <ClockCountdown size={18} />
            <span>{course?.duration} minutes</span>
          </p>
          <p className="text-sm text-muted-foreground text-right flex items-center gap-2">
            <UserCircle size={18} />
            <span className="truncate capitalize">
              By {course?.teacher?.full_name}
            </span>
          </p>
        </div>

      </CardContent>

      <CardFooter className="flex ">
        <Button className="w-full" onClick={() => onEnroll(course.id,course.teacher_id)}>
          Enroll course
        </Button>

      </CardFooter>
    </Card>
  )
}


export function TeacherCourseCard({ course }) {
  return (
    <Card className="w-full rounded-2xl duration-300 overflow-hidden shadow-none pt-0">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full min-h-48 max-h-48 object-cover border bg-white"
      />
      <CardHeader className="">
        <CardTitle className="text-xl font-semibold truncate">
          {course.title}
        </CardTitle>
        {/* <Badge variant="outline" className="mt-1 capitalize w-fit">
          {course?.category?.name}
        </Badge> */}
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{course.total_enrollments} Enrolled</span>
          <span>{course.duration} hrs</span>
        </div>
        <p className="text-xs text-muted-foreground text-right">
          By {course?.teacher?.full_name}
        </p>
      </CardContent>
      <CardFooter className="flex">
        <Link to={`/teacher/courses/${course.id}/edit`} className="w-full flex">
          <Button className="w-full">
            Edit Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}