import React, { useState, useEffect } from 'react';
import { getStudentCourses } from '../services/coursesService';
import { useIsMobile } from '../hooks/use-mobile';
import CourseCard, { StudentCourseCard } from '../components/theme/CourseCard';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { ArrowCounterClockwise } from '@phosphor-icons/react';

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useIsMobile();
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!user?.id) return;

      const { data: fetchedCourses, error: coursesError } = await getStudentCourses(user.id);
      if (coursesError) throw new Error(coursesError.message || 'Failed to fetch courses.');

      setCourses(fetchedCourses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  if (!user) return <div>Loading user...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes cours</h1>

      {/* Uncomment if you want a refresh button */}
      {/* 
      <Button variant="outline" className="mb-4" onClick={fetchData}>
        <ArrowCounterClockwise size={18} /> Refresh
      </Button> 
       */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses?.map((course) => (
          <StudentCourseCard key={course?.id} course={course} />
        ))}
        
      </div>

      {courses?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No courses found matching your criteria
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
