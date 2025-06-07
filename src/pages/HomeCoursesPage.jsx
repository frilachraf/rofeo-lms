import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { enrollCourse, getFilteredCourses } from "../services/coursesService";
import CourseCard, { PublicCourseCard } from "../components/theme/CourseCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function HomeCoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleEnroll = async (courseId,teacherId) => {
    try {
      const { data, error } = await enrollCourse(user.id, courseId,teacherId);
      console.log(data);
      if (error) {
        console.error(error);
      }
      toast.success("Course enrolled successfully");
      navigate(`/student/courses/${data[0].id}/content`);
    } catch (error) {
      toast.error("Failed to enroll course");
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  } 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-center">Explore Our Courses</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          Discover a wide range of courses taught by expert instructors. Find the perfect course to help you achieve your learning goals.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xl flex gap-2">
          <Input
            type="text"
            name="search"
            placeholder="Search courses..."
            defaultValue={searchQuery}
            className="flex-1"
          />
          <Button type="submit">
            <MagnifyingGlass className="w-5 h-5" />
            Search
          </Button>
        </form>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
         {courses.map((course) => (
            <PublicCourseCard key={course.id} course={course} onEnroll={handleEnroll} />
         ))}
        </div>
      </div>
    </div>
  );
}
