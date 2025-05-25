import React, { useState, useEffect } from 'react';
import { getAllCourses, getCategories, getFilteredCourses, getStudentCourses } from '../services/coursesService';
import { useIsMobile } from '../hooks/use-mobile';
import CourseCard, { StudentCourseCard } from '../components/theme/CourseCard';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { ArrowCounterClockwise } from '@phosphor-icons/react';

const StudentCoursesPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const isMobile = useIsMobile();
  const { user } = useAuth();

  
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: courses, error: coursesError } = await getStudentCourses(user?.id);
      
      
      if (error) throw error;
      setCourses(courses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData()

    // Add debounce for search
    

    
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sm:px-10 py-4">
      <h1 className="text-2xl font-bold mb-6">Mes cours</h1>
      {/* <Button variant="outline" className='mb-4' onClick={() => fetchData()}><ArrowCounterClockwise size={18}/> Refresh</Button> */}
      <Button variant="outline" className='mb-4' onClick={() => fetchData()}>
        <ArrowCounterClockwise size={18} /> Actualiser
      </Button> 

      {/* Courses Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10`}>
        {courses?.map((course) => (
            <StudentCourseCard key={course?.id} course={course} />
        ))}
      </div>

      {/* No Results Message */}
      {courses?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun cours trouvé correspondant à vos critères
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
