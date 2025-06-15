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
import { FilePdf, YoutubeLogo, Clock, User, GraduationCap, BookOpen, CheckCircle } from '@phosphor-icons/react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-toastify';
import { getStudentEnrollment } from '../services/studentService';
import { getYouTubeEmbedUrl } from '../services/uiServices';

const StudentCourseContentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (!id || !user) return;

    const fetchCourseAndProgress = async () => {
      try {
        setLoading(true);
        const { data: enrollmentData, error: enrollmentError } = await getStudentEnrollment(id, user.id);
        if (enrollmentError) throw enrollmentError;
        
        if (!enrollmentData) {
          throw new Error('Inscription non trouvée');
        }

        setEnrollment(enrollmentData);
        setCourse(enrollmentData.course);

        // Get completed lessons from enrollment_progress
        const completed = enrollmentData.enrollment_progress?.map(progress => progress.lesson_id) || [];
        setCompletedLessons(completed);

        // Calculate progress percentage
        const totalLessons = enrollmentData.course.lessons?.length || 0;
        const completedCount = completed.length;
        const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
        setProgress(progressPercentage);

      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndProgress();
  }, [id, user]);

  const handleLessonClick = async (lesson) => {
    try {
      if (!enrollment) {
        toast.error('Inscription non trouvée');
        return;
      }
      
      const { error } = await addEnrollmentProgress(enrollment.id, lesson.id);
      if (error) throw error;

      // Update local state
      const updatedCompletedLessons = [...completedLessons, lesson.id];
      setCompletedLessons(updatedCompletedLessons);
      
      // Recalculate progress using the updated state
      const totalLessons = course.lessons?.length || 0;
      const newProgress = (updatedCompletedLessons.length / totalLessons) * 100; // Use updated array length
      setProgress(newProgress);

      toast.success('Progression enregistrée !');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) return <div>Loading user...</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-muted-foreground mt-2">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Contenu du cours</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>{Math.round(progress)}%</span>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
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
                        className="hover:no-underline [&[data-state=open]]:text-primary [&[data-state=open]>svg]:text-primary py-4"
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={completedLessons.includes(lesson.id) ? "default" : "outline"} 
                            className="h-6 w-6 flex items-center justify-center p-0"
                          >
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{lesson.title}</span>
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-6 mt-4">
                          <div className="rounded-lg p-4 bg-muted/50">
                            <ContentViewer html={lesson.content} />
                          </div>

                          <Tabs defaultValue="video" className="w-full">
                            <TabsList className="w-full grid grid-cols-2">
                              <TabsTrigger value="video" className="flex items-center gap-2">
                                <YoutubeLogo className="w-4 h-4" />
                                <span>Vidéo</span>
                              </TabsTrigger>
                              <TabsTrigger value="pdf" className="flex items-center gap-2">
                                <FilePdf className="w-4 h-4" />
                                <span>PDF</span>
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="video" className="mt-4">
                              {lesson.video_url ? (
                                <div className="rounded-lg overflow-hidden shadow-md">
                                  <iframe
                                    className="w-full aspect-video"
                                    src={getYouTubeEmbedUrl(lesson.video_url)}
                                    title="Lesson Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                  />
                                </div>
                              ) : (
                                <div className="text-center py-8 bg-muted/50 rounded-lg">
                                  <p className="text-muted-foreground">Aucune vidéo disponible</p>
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="pdf" className="mt-4">
                              {lesson.file_url ? (
                                <div className="rounded-lg overflow-hidden shadow-md">
                                  <embed
                                    src={lesson.file_url}
                                    type="application/pdf"
                                    className="h-[60vh] w-full"
                                  />
                                </div>
                              ) : (
                                <div className="text-center py-8 bg-muted/50 rounded-lg">
                                  <p className="text-muted-foreground">Aucun PDF disponible</p>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">Aucune leçon disponible</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="hidden md:block space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Progression du cours</p>
                    <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedLessons.length} leçons complétées sur {course.lessons?.length || 0}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Instructeur</p>
                    <p className="font-medium capitalize">{course.teacher?.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Durée</p>
                    <p className="font-medium">{course.duration} minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Niveau</p>
                    <p className="font-medium capitalize">{course.level_id?.name || ''}</p>
                  </div>
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
