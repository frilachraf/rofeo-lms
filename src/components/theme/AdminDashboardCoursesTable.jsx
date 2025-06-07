import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheckIcon } from "lucide-react"
import { EyeSlash } from "@phosphor-icons/react"

export default function AdminDashboardCoursesTable({ data }) {
    return (
        <div className="relative flex flex-col gap-4 overflow-auto h-full">
            <div className="overflow-hidden rounded-lg border h-full">
                <Table variant='border' className=''>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader className='bg-muted sticky top-0 z-10'>
                        <TableRow>
                            <TableHead className="">#</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Teacher</TableHead>

                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Enrollments</TableHead>

                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {/* <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow> */}
                        {data.map((item, i) => {
                            return (
                                <TableRow className="p-5">
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell className='max-w-[20vw] text-ellipsis line-clamp-2 overflow-hidden'>
                                    {item.title}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.teacher.full_name}

                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.public
                                        ?
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-500/10 text-green-500"
                                        >
                                            <BadgeCheckIcon />
                                            public
                                        </Badge>
                                        :
                                        <Badge
                                            variant="secondary"
                                            className="bg-gray-500/10 text-gray-500"
                                        >
                                            <EyeSlash /> 
                                            archived
                                        </Badge>
                                        }
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.enrollments.length}
                                    </TableCell>
                                    <TableCell>
                                        {item.duration} min
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </div>

        </div>

    )
}