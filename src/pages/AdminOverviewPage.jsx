// import { AppSidebar } from "../../components/app-sidebar"
import { ChartAreaInteractive } from "../components/chart-area-interactive"
import { DataTable } from "../components/data-table"
import { SectionCards } from "../components/section-cards"
import { getAllCourses, getCoursesCount, getTodayEnrollmentsCount, getTotalEnrollmentsPerDay, getTeachersCount, getStudentsCount, getPopularCourses, getRecentStudentActivities } from '../services/adminServices'
import { Button } from "../components/ui/button"
import { useEffect, useState, useCallback } from "react"
import { MyChart } from "../components/theme/Chart"
import AdminDashboardCoursesTable from "../components/theme/AdminDashboardCoursesTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, TrendingUp, ArrowUpRight, Settings, FileText, BarChart2 } from "lucide-react"
import { Loading } from "@/components/ui/loading"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import RecentActivitiesTable from "../components/theme/RecentActivitiesTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export default function AdminOverviewPage() {
  const [totalCourses, setTotalCourses] = useState(null)
  const [totalTeachers, setTotalTeachers] = useState(null)
  const [totalStudents, setTotalStudents] = useState(null)
  const [totalTodayEnrollments, setTotalTodayEnrollments] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [popularCourses, setPopularCourses] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [loadingStates, setLoadingStates] = useState({
    cards: true,
    chart: true,
    table: true,
    popularCourses: true,
    recentActivities: true
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  const handleError = useCallback((error, context) => {
    console.error(`Erreur dans ${context}:`, error)
    toast.error(`Une erreur est survenue lors de la récupération des ${context}`)
    setError(error)
  }, [])

  const fetchCardsData = async () => {
    try {
      setLoadingStates(prev => ({ ...prev, cards: true }))
      const [
        { count: coursesCount },
        { count: teachersCount },
        { count: studentsCount },
        { count: todayEnrollmentsCount }
      ] = await Promise.all([
        getCoursesCount(),
        getTeachersCount(),
        getStudentsCount(),
        getTodayEnrollmentsCount()
      ])

      setTotalCourses(coursesCount)
      setTotalTeachers(teachersCount)
      setTotalStudents(studentsCount)
      setTotalTodayEnrollments(todayEnrollmentsCount)
    } catch (error) {
      handleError(error, "données des cartes")
    } finally {
      setLoadingStates(prev => ({ ...prev, cards: false }))
    }
  }

  // const fetchChartData = async () => {
  //   try {
  //     const { data } = await getTotalEnrollmentsPerDay()
  //     setChartData(data)
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des données du graphique :", error)
  //   }
  // }

  const fetchTableData = async () => {
    try {
      const { data } = await getAllCourses()
      setTableData(data)
    } catch (error) {
      console.error("Erreur lors de la récupération des données du tableau :", error)
    } finally {
      setLoadingStates(prev => ({ ...prev, table: false }))
    }
  }

  const fetchPopularCourses = async () => {
    try {
      const { data } = await getPopularCourses()
      setPopularCourses(data)
    } catch (error) {
      console.error("Erreur lors de la récupération des cours populaires :", error)
    }
  }

  const fetchRecentActivities = async () => {
    try {
      const { data } = await getRecentStudentActivities()
      setRecentActivities(data)
    } catch (error) {
      console.error("Erreur lors de la récupération des activités récentes :", error)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingStates(prev => ({ ...prev, cards: true, chart: true, table: true, popularCourses: true, recentActivities: true }))
      await Promise.all([
        fetchCardsData(),
        fetchChartData(),
        fetchTableData(),
        fetchPopularCourses(),
        fetchRecentActivities()
      ])
    }
    fetchAllData()
  }, [])

  const StatCard = ({ title, value, icon: Icon, badgeText, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="col-span-1"
    >
      <Card className="shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded" />
          ) : (
            <>
              <div className="text-2xl font-bold">{value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-primary/10">
                  {badgeText}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  const QuickActionButton = ({ icon: Icon, text, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        variant="outline"
        className="h-auto py-4 flex flex-col items-center gap-2 w-full"
        onClick={onClick}
        aria-label={text}
      >
        <Icon className="h-6 w-6" />
        <span className="text-center text-pretty">{text}</span>
      </Button>
    </motion.div>
  )

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-xl font-semibold">Une erreur est survenue</h2>
        <Button onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>
        <div className="flex gap-2">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => navigate('/admin/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => navigate('/admin/reports')}>
              <FileText className="h-4 w-4 mr-2" />
              Rapports
            </Button>
          </motion.div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytique</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total des Cours"
              value={totalCourses}
              icon={BookOpen}
              badgeText="Cours Actifs"
              loading={loadingStates.cards}
            />
            <StatCard
              title="Total des Enseignants"
              value={totalTeachers}
              icon={Users}
              badgeText="Enseignants Enregistrés"
              loading={loadingStates.cards}
            />
            <StatCard
              title="Total des Étudiants"
              value={totalStudents}
              icon={GraduationCap}
              badgeText="Étudiants Actifs"
              loading={loadingStates.cards}
            />
            <StatCard
              title="Inscriptions du Jour"
              value={totalTodayEnrollments}
              icon={TrendingUp}
              badgeText="Nouvelles Inscriptions"
              loading={loadingStates.cards}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-7"
            >
              <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Aperçu des Inscriptions</CardTitle>
                  <p className="text-sm text-muted-foreground">Inscriptions des 7 derniers jours</p>
                </CardHeader>
                <CardContent>
                  <MyChart data={chartData} />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-full"
            >
              <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Activités Récentes</CardTitle>
                  <p className="text-sm text-muted-foreground">Dernières inscriptions aux cours</p>
                </CardHeader>
                <CardContent>
                  <RecentActivitiesTable data={recentActivities} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
          >
            <Card className="shadow-sm hover:shadow-md transition-all duration-200 h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Actions Rapides</CardTitle>
                <p className="text-sm text-muted-foreground">Tâches administratives courantes</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <QuickActionButton
                    icon={Users}
                    text="Gérer les Enseignants"
                    onClick={() => navigate('/admin/teachers')}
                  />
                  <QuickActionButton
                    icon={GraduationCap}
                    text="Gérer les Étudiants"
                    onClick={() => navigate('/admin/students')}
                  />
                  <QuickActionButton
                    icon={BookOpen}
                    text="Gérer les Cours"
                    onClick={() => navigate('/admin/courses')}
                  />
                  <QuickActionButton
                    icon={BarChart2}
                    text="Voir les Statistiques"
                    onClick={() => navigate('/admin/analytics')}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Analyse des Performances</CardTitle>
              <p className="text-sm text-muted-foreground">Statistiques détaillées sur les performances de la plateforme</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Taux de Complétion</h3>
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-sm text-muted-foreground">Moyenne des cours complétés</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Taux de Rétention</h3>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-sm text-muted-foreground">Étudiants actifs mensuellement</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Satisfaction</h3>
                  <div className="text-2xl font-bold">4.5/5</div>
                  <p className="text-sm text-muted-foreground">Note moyenne des cours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Rapports Disponibles</CardTitle>
              <p className="text-sm text-muted-foreground">Générez et téléchargez des rapports détaillés</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Rapport des Inscriptions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Rapport des Performances
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Rapport Financier
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
