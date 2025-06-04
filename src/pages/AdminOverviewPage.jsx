// import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import {getAllCourses, getCoursesCount, getTodayEnrollmentsCount, getTotalEnrollmentsPerDay} from '../services/adminServices'
import {Button} from "../components/ui/button"
import { useEffect, useState } from "react"
import { MyChart } from "../components/theme/Chart"
import AdminDashboardCoursesTable from "../components/theme/AdminDashboardCoursesTable"

export default function AdminOverviewPage() {
  const [totalCourses, setTotalCourses] = useState(null)
  const [totalTodayEnrollments, setTotalTodayEnrollments] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [tableData, setTableData] = useState([])
  
  const fetchCardsData = async ()=> {
    try{
      const {count:coursesCount , error:coursesCountError} = await getCoursesCount()
      const {count:todayEnrollmentsCount , enrollmentsCountError} = await getTodayEnrollmentsCount()
      setTotalTodayEnrollments(todayEnrollmentsCount)
      setTotalCourses(coursesCount)
    }
    catch (error){
      console.log(error.message)
    }
    finally{}
  }
  const fetchChartData = async ()=>{
    try{
      const {data} = await getTotalEnrollmentsPerDay()
      // console.log('data', JSON.stringify(data))
      setChartData(data)

    }
    catch(error){
      console.log(error)
    }
    finally{

    }

  }
  const fetchTableData = async ()=>{
    try{
      const {data} = await getAllCourses()
      // console.log('data', JSON.stringify(data))
      setTableData(data)
      console.log(data)
    }
    catch(error){
      console.log(error)
    }
    finally{

    }
  }
  useEffect(() => {
    fetchCardsData()
    fetchChartData()
    fetchTableData()

  },[])
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards totalCourses={totalCourses} totalTodayEnrollments={totalTodayEnrollments} />
      <div className="px-4 lg:px-6">
        
        {/* <Button onClick={()=>fetchTableData()}>
          reload
        </Button> */}
        
        <div className="flex flex-col row-gap-4 lg:grid grid-cols-12 gap-4">
        <div className="col-span-4">
        <MyChart data={chartData} />
        </div>
        <div className="col-span-8">
        <AdminDashboardCoursesTable data={tableData} />
        </div>
        </div>
      </div>
    </div>
  )
}
