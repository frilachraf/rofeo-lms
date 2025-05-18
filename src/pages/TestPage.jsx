import { useState, useEffect } from 'react';
import { getFilteredCourses, getCategories, getStudentCourses, getTeacherCourses, getCourseById, enrollCourse, unenrollCourse, updateCourseEnrollmentProgress } from '../services/coursesService';
import { Button } from '@/components/ui/button';
const TestPage = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        categoryId: null,
        searchTerm: '',
        sortBy: 'created_at'
    });

    const fetchData = async () => {
        try {
            // const [coursesResponse, categoriesResponse] = await Promise.all([
            //   getFilteredCourses(filters),
            //   getCategories()
            // ]);

            // if (coursesResponse.error) throw new Error(coursesResponse.error.message);
            // if (categoriesResponse.error) throw new Error(categoriesResponse.error.message);

            // setCourses(coursesResponse.data || []);
            // setCategories(categoriesResponse.data || []);
            // const { data, error } = await getCourseById("5");
            //   const { data, error } = await getTeacherCourses("f273ab93-73f9-4c9a-8f2e-447e5da67b5f")
            // const { data, error } = await enrollCourse("4d71fe75-156f-4028-9137-28a1cb474210", "5", 4);
            // const { data, error } = await unenrollCourse("4d71fe75-156f-4028-9137-28a1cb474210", "5");
            const { data, error } = await updateCourseEnrollmentProgress("4d71fe75-156f-4028-9137-28a1cb474210", "2");

            console.log(data, error)
            // console.log(data[0].lessons.length)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchData();
    }, [filters]);

    const handleCategoryChange = (categoryId) => {
        setFilters(prev => ({
            ...prev,
            categoryId: categoryId === 'all' ? null : categoryId
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Test Page</h1>


            <Button onClick={fetchData}>Fetch Data</Button>
        </div>
    );
};

export default TestPage;
