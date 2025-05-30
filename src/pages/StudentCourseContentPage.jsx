import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addEnrollmentProgress } from '../services/coursesService';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../components/ui/card';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '../components/ui/accordion';
import { ContentViewer } from '../components/blocks/TiptapEditor';
import { FilePdf, YoutubeLogo } from '@phosphor-icons/react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from 'react-toastify';
import { getStudentEnrollment, getStudentEnrollmentProgress } from '../services/studentService';
import { getYouTubeEmbedUrl } from '../services/uiServices';

const StudentCourseContentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only fetch if id and user are available
    if (!id || !user) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data, error } = await getStudentEnrollment(id, user.id);
        if (error) throw error;
        setEnrollment(data);
        console.log('enrollment', data);
        setCourse(data.course);

      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleLessonClick = async (lesson) => {
    try {
      const { error } = await addEnrollmentProgress(enrollment.id, lesson.id);
      if (error) throw error;
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) return <div>Loading user...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found</div>;





  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className="font-bold text-2xl">{course.title}</h1>
              </CardTitle>
              <CardDescription>
                <p className="text-muted-foreground">{course.description}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {course.lessons?.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue={course.lessons[0].id.toString()}
                >
                  {course.lessons.map((lesson, index) => (
                    <AccordionItem key={lesson.id} value={lesson.id.toString()}>
                      <AccordionTrigger
                        className="hover:no-underline [&[data-state=open]]:text-primary [&[data-state=open]>svg]:text-primary"
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{index + 1}.</span>
                          <span className="font-semibold">{lesson.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-4 mt-2">
                          <div className="rounded-lg p-1">
                            <ContentViewer html={lesson.content} />
                          </div>

                          <Tabs defaultValue="video" className="w-full">
                            <TabsList className="w-full">
                              <TabsTrigger value="video" className="flex items-center gap-2">
                                <YoutubeLogo />
                                <span>Video</span>
                              </TabsTrigger>
                              <TabsTrigger value="pdf" className="flex items-center gap-2">
                                <FilePdf />
                                <span>PDF</span>
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="video">
                              {lesson.video_url ? (
                                <iframe
                                  className="w-full aspect-video rounded-lg"
                                  src={getYouTubeEmbedUrl(lesson.video_url)}
                                  title="Lesson Video"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <div className="text-center py-4">No video available</div>
                              )}
                            </TabsContent>

                            <TabsContent value="pdf">
                              {lesson.file_url ? (
                                <embed
                                  src={lesson.file_url}
                                  type="application/pdf"
                                  className="h-[50vh] w-full rounded-lg"
                                />
                              ) : (
                                <div className="text-center py-4">No PDF available</div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-4">No lessons available</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:block space-y-6">
          <Card>
            
            <CardHeader>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
               {/*
                 */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="capitalize">{course.teacher?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p>{course.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="capitalize">{course.level?.name || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseContentPage;
