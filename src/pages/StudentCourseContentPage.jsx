import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/coursesService';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from '../components/ui/dialog';

const StudentCourseContentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data, error } = await getCourseById(id);
        if (error) throw error;
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Cours introuvable</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contenu du cours</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.lessons?.map((lesson) => (
                  <AccordionItem key={lesson.id} value={lesson.id.toString()}>
                    <AccordionTrigger className="hover:no-underline">
                      <h3 className="font-semibold">{lesson.title}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-2 mt-2">
                        {lesson.video_url && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Regarder la vidéo</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogTitle>{lesson.title}</DialogTitle>
                              <DialogDescription className="mt-4">
                                <div className="aspect-video w-full">
                                  <iframe
                                    src={'https://www.youtube.com/watch?v=6-RG5e1vFAs'}
                                    className="w-full h-full rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </DialogDescription>
                                
                                {lesson.video_url}
                            </DialogContent>
                          </Dialog>
                        )}
                        {lesson.file_url && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Voir les matériaux</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogTitle>{lesson.title}</DialogTitle>
                              <DialogDescription className="mt-4">
                                {lesson.file_url.endsWith('.pdf') ? (
                                  <iframe
                                    src={lesson.file_url}
                                    className="w-full h-[80vh] rounded-lg"
                                    title="PDF Viewer"
                                  />
                                ) : (
                                  <div className="p-4">
                                    <a
                                      href={lesson.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      Télécharger les matériaux
                                    </a>
                                  </div>
                                )}
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informations du cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Instructeur</p>
                  <p>{course.teacher?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durée</p>
                  <p>{course.duration} heures</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Niveau</p>
                  <p>{course.level?.name}</p>
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
