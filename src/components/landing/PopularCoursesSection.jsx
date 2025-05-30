import { Loader, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoursesLimit } from "@/services/coursesService";
import { useState, useEffect } from "react";
import CourseCard from "../theme/CourseCard";
import { motion } from "framer-motion";

export const PopularCoursesSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await getCoursesLimit(4);
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-center px-4 py-20 mb-24">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0e0e0e] mb-4">
          Nos cours populaires
        </h2>
        <p className="text-[#565656] text-base max-w-[630px] mx-auto">
          Découvrez nos formations les plus appréciées par nos étudiants.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full h-[148px] flex items-center justify-center">
            <Loader className="w-10 h-10 animate-spin text-[#1c70ff]" />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <Button
          variant="outline"
          className="border-[#cbd5e1] text-[#4b5563] hover:text-[#1c70ff] hover:border-[#1c70ff] rounded-md px-6 py-2 text-sm transition"
        >
          Voir tous les cours
        </Button>
      </motion.div>
    </section>
  );
};




// import { Loader, StarIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { getCoursesLimit } from "@/services/coursesService";
// import { useState, useEffect } from "react";
// import CourseCard from "../theme/CourseCard";

// // const popularCourses = [
// //   {
// //     id: 1,
// //     title: "Introduction à la Robotique",
// //     instructor: "Ibrahim Kamel",
// //     rating: 4.5,
// //     reviews: 122,
// //     price: "109.99 DH",
// //     image: "../../src/components/imges/intro to robots.jpg",
// //   },
// //   {
// //     id: 2,
// //     title: "les bases de la robotique grâce au BeeBot",
// //     instructor: "Richard James",
// //     rating: 4.5,
// //     reviews: 122,
// //     price: "610.99 DH",
// //     image: "../../src/components/imges/cours.jpg",
// //   },
// //   {
// //     id: 3,
// //     title: "Le monde des robots",
// //     instructor: "Richard James",
// //     rating: 4.5,
// //     reviews: 122,
// //     price: "190.99 DH",
// //     image: "../../src/components/imges/le monde des robots.jpg",
// //   },
// //   {
// //     id: 4,
// //     title: "Programmation du Robot Thymio (VPL & Thymio)",
// //     instructor: "Richard James",
// //     rating: 4.5,
// //     reviews: 122,
// //     price: "175.95 DH",
// //     image: "../../src/components/imges/elec.jpg",
// //   },
// // ];

// export const PopularCoursesSection = () => {
//   const [courses, setCourses] = useState([]);
//   useEffect(() => {
//     const fetchCourses = async () => {
//       const { data, error } = await getCoursesLimit(4);
//       setCourses(data);
//     };
//     fetchCourses();
//   }, []);
//   return (
//     <section className="w-full flex flex-col items-center mb-24 px-15">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-medium text-[#0e0e0e] mb-8">
//           Nos cours populaires
//         </h2>
//         <p className="text-[#565656] text-base max-w-[630px]">
//           Découvrez nos formations les plus appréciées par nos étudiants
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {courses && courses.length > 0 ? courses.map((course) => (
//           // <Card
//           //   key={course.id}
//           //   className="w-[265px] border-[#e1e1e1] rounded-lg overflow-hidden"
//           // >
//           //   <img
//           //     className="w-full h-[148px] object-cover"
//           //     alt={course.title}
//           //     src={course.image}
//           //   />
//           //   <CardContent className="p-5">
//           //     <h3 className="font-semibold text-base text-[#0e0e0e] mb-2 leading-5">
//           //       {course.title}
//           //     </h3>
//           //     <p className="text-[#565656] text-sm mb-4">
//           //       {course.instructor}
//           //     </p>
//           //     <div className="flex items-center gap-1 mb-4">
//           //       <span className="font-medium text-neutral-700 text-sm">
//           //         {course.rating}
//           //       </span>
//           //       <div className="flex">
//           //         {[...Array(4)].map((_, i) => (
//           //           <StarIcon
//           //             key={i}
//           //             className="w-3 h-3 fill-current text-yellow-500"
//           //           />
//           //         ))}
//           //         <StarIcon className="w-3 h-3 text-gray-300" />
//           //       </div>
//           //       <span className="text-[#888888] text-sm ml-2">
//           //         ({course.reviews})
//           //       </span>
//           //     </div>
//           //     <p className="font-semibold text-neutral-700 text-base">
//           //       {course.price}
//           //     </p>
//           //   </CardContent>
//           // </Card>
//           <CourseCard key={course.id} course={course} />
//         )) : (
//           <div className="w-full h-[148px] flex items-center justify-center">
//             <Loader className="w-10 h-10 animate-spin" />
//           </div>
//         )}
//       </div>

//       <Button 
//         variant="outline"
//         className="border-[#6b728080] coursor text-[#8a8c8f] rounded-[5px] px-4 py-2 mt-10"
//       >
//         Voir tous les cours
//       </Button>
//     </section>
//   );
// }; 