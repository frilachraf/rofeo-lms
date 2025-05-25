import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowCounterClockwise, Article, ArticleNyTimes, FilePdf, LinkSimple, Trash, Video, Warning, WarningCircle } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ContentViewer } from "../components/blocks/TiptapEditor"
import LessonAddForm from "../components/forms/LessonAddForm"
import { Button } from "../components/ui/button"
import { deleteLesson, getCourseById } from "../services/coursesService"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CourseEditForm from "../components/forms/CourseEditForm"
import { Pen } from "lucide-react"
export default function TeacherCoursePage() {
    const [course, setCourse] = useState(null)
    const { courseId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [lessons, setLessons] = useState([])
    const fetchCourse = async () => {
        try {
            const { data, error } = await getCourseById(courseId)
            if (error) throw error
            setCourse(data)
            setLessons(data.lessons)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {


        fetchCourse()
        // if (courseId) {
        // }
    }, [courseId])

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    const handleDelete = async (lessonId) => {
        try {
            await deleteLesson(lessonId)
            toast.success('Lesson deleted successfully')
            fetchCourse()
        } catch (error) {
            console.error(error)
        }
    }
    if (course) return (
        <div className="container py-8 px-10">

            <>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Détails du cours                    </h1>
                </div>

                <div className="flex flex-col gap-4 ">
                    <div className="lg:flex gap-4 space-y-4 lg:space-y-0">
                        <div className="flex-1 rounded-lg shadow">
                            <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover rounded-lg" />
                        </div>
                        <div className="flex flex-2 flex-col gap-4 w-full">
                            <div className="">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
                                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                        <DialogTrigger>
                                            <Button variant="ghost"><Pen size={32} /></Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <CourseEditForm course={course} setOpen={() => { setEditOpen(false); fetchCourse() }} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {/* <p className="text-gray-600">{course.description}</p> */}
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit perferendis repellendus voluptas incidunt repudiandae? Explicabo, facere. Excepturi quis quas placeat dolore corporis ipsam. Quas in tempora eos fuga sunt labore!</p>
                                <div className="gap-2">
                                    <p className="text-gray-600">Durée: {course.duration} minutes</p>
                                    <p className="text-gray-600">Niveau: {course.level?.title}</p>
                                </div>
                            </div>
                            <div className="h-full">

                            </div>
                            <div className="flex w-full">

                                <Alert variant="destructive" className="border-red-100 flex ">
                                    <WarningCircle className="" size={32} />
                                    <div className="w-full">
                                    <AlertTitle>Supprimer le cours
                                    </AlertTitle>
                                    <AlertDescription className=''>
                                        Êtes-vous sûr de vouloir supprimer ce cours?
                                    </AlertDescription>
                                    </div>
                                    <Button variant="destructive" className="">Supprimer</Button>
                                </Alert>

                            </div>
                        </div>
                    </div>

                    {/* <div className="">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="">
                        <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                        <p className="text-gray-600">{course.description}</p>
                        <div className="mt-4">
                            <p className="text-gray-600">Duration: {course.duration} minutes</p>
                            <p className="text-gray-600">Level: {course.level?.title}</p>
                        </div>
                    </div> */}
                </div>

            </>
            <div className="mt-8 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold">Leçons </h2>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => fetchCourse()}><ArrowCounterClockwise size={20} /></Button>
                        <Button onClick={() => setOpen(true)}>Ajouter une leçon</Button>
                    </div>
                </div>

                {/* <DraggableLessonsSection lessons={lessons} /> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                #
                            </TableHead>
                            <TableHead>
                                Titre
                            </TableHead>
                            <TableHead>
                                Contenu
                            </TableHead>
                            <TableHead>
                                Vidéo
                            </TableHead>
                            <TableHead>
                                PDF
                            </TableHead>
                            <TableHead></TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lessons.map((lesson, index) => (
                            <>
                                <TableRow key={lesson.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{lesson.title}</TableCell>
                                    <TableCell>
                                        <Dialog >
                                            <DialogTrigger>
                                                <button type="button" className="cursor-pointer"><Article size={20} className="text-primary" /></button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <ContentViewer html={lesson.content} />
                                            </DialogContent>
                                        </Dialog>

                                    </TableCell>
                                    <TableCell><Link to={lesson.video_url} target="_blank"><LinkSimple size={20} className="text-primary" /></Link></TableCell>
                                    <TableCell><Link to={lesson.file_url} target="_blank"><FilePdf size={20} className="text-primary" /></Link></TableCell>
                                    <TableCell>
                                        <button type="button" className="cursor-pointer" onClick={() => handleDelete(lesson.id)}><Trash size={20} className="text-red-500" /></button>
                                    </TableCell>

                                </TableRow>

                            </>
                        ))}
                    </TableBody>
                </Table>


            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Ajouter une leçon</DialogTitle>
                        <DialogDescription>
                            Ajouter une nouvelle leçon au cours
                        </DialogDescription>
                    </DialogHeader>
                    <LessonAddForm setOpen={(e) => { setOpen(e); fetchCourse() }} courseId={courseId} />
                </DialogContent>
            </Dialog>
        </div>
    )
}




export const LessonCard = ({ lesson }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDelete = async () => {
        setIsDeleting(true)
        await deleteLesson(lesson.id)
        setIsDeleting(false)
    }
    return (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow relative">
            <div className="h-full">
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-500">{lesson.content}</p>
            </div>
            <div className="flex gap-2">
                <Link><ArticleNyTimes size={32} className="text-green-500" /></Link>
                <Link><Video size={32} className="text-red-500" /></Link>
                <Link><FilePdf size={32} className="text-primary" /></Link>
            </div>
            <button className="self-end absolute top-4 right-4 cursor-pointer" onClick={handleDelete}>
                <Trash size={20} className="text-red-500" />
            </button>
        </div>
    )
}



