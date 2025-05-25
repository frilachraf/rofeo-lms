import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { getFilteredCourses } from "../services/coursesService";
import CourseCard from "../components/theme/CourseCard";
import { useSearchParams } from "react-router-dom";

export default function HomeCoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search query from URL params, default to empty string
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await getFilteredCourses(
            {
                categoryId: null,
                searchTerm: searchQuery,
                sortBy: 'created_at'
            }
        );
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      } 
    };
    fetchCourses();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    setSearchParams({ q: query });
  };

  if (loading) {
    return <div>Chargement...</div>;
  } 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Explorez nos cours</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          Découvrez une large gamme de cours enseignés par des instructeurs experts. Trouvez le cours idéal pour atteindre vos objectifs d'apprentissage.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xl flex gap-2">
          <Input
            type="text"
            name="search"
            placeholder="Rechercher des cours..."
            defaultValue={searchQuery}
            className="flex-1"
          />
          <Button type="submit">
            <MagnifyingGlass className="w-5 h-5" />
            Rechercher
          </Button>
        </form>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
         {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
         ))}
        </div>
      </div>
    </div>
  );
}
