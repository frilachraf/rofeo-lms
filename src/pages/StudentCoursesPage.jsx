import React, { useState, useEffect } from 'react';
import { getAllCourses, getCategories, getFilteredCourses } from '../services/coursesService';
import { useIsMobile } from '../hooks/use-mobile';
import CourseCard, { StudentCourseCard } from '../components/theme/CourseCard';

const StudentCoursesPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const isMobile = useIsMobile();

  // Sample categories - replace with your actual categories
//   const categories = [
//     { value: '', label: 'All Categories' },
//     { value: '1', label: 'Programming' },
//     { value: '2', label: 'Design' },
//     { value: '3', label: 'Business' },
//   ];

  const sortOptions = [
    { value: 'created_at', label: 'Newest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'instructor', label: 'Instructor' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: courses, error: coursesError } = await getFilteredCourses({
          categoryId: category,
          searchTerm,
          sortBy,
        });
        const { data: categories, error: categoriesError } = await getCategories();
        
        
        if (error) throw error;
        setCourses(courses);
        setCategories(categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce for search
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [category, searchTerm, sortBy]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-10 py-4">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      {/* Filters Section */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          {category}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories?.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10`}>
        {courses?.map((course) => (
            <StudentCourseCard key={course?.id} course={course} />
        ))}
      </div>

      {/* No Results Message */}
      {courses?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No courses found matching your criteria
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
