import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from 'framer-motion';
import { Home, Mail, User, Lock, GraduationCap, School, Image } from 'lucide-react';
import { useSupabaseUpload } from "../hooks/use-supabase-upload";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const StudentSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { onUpload: uploadAvatar } = useSupabaseUpload({ bucketName: "rofeofiles" });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    level: '',
    school: '',
    avatar: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.level.trim()) {
      newErrors.level = 'Le niveau est requis';
    }

    if (!formData.school.trim()) {
      newErrors.school = 'L\'établissement scolaire est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    let avatarUrl = null;

    if (avatarFile) {
      const { data: uploadData, error: uploadError } = await uploadAvatar([avatarFile]);
      if (uploadError || !uploadData || uploadData.length === 0) {
        console.error('Error uploading avatar:', uploadError);
        toast.error('Erreur lors du téléchargement de l\'avatar.');
        setIsLoading(false);
        return;
      }
      avatarUrl = `https://qwcxskzpvafmhfczdscy.supabase.co/storage/v1/object/public/rofeofiles/${uploadData[0].path}`;
    }

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName,
          level: formData.level,
          school: formData.school,
          avatar: avatarUrl,
          role: 'student'
        }
      );

      if (error) throw error;
      
      toast.success('Compte étudiant créé avec succès');
      navigate('/student/courses');
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.message || 'Échec de la création du compte');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Inscription Étudiant
              </CardTitle>
              <CardDescription className="text-center">
                Créez votre compte étudiant pour accéder aux cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Entrez votre nom complet"
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-9 transition-all focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Entrez votre email"
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-9 transition-all focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <label htmlFor="password" className="text-sm font-medium">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Créer un mot de passe"
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-9 transition-all focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <label htmlFor="level" className="text-sm font-medium">
                    Niveau d'étude
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="level"
                      name="level"
                      type="text"
                      required
                      placeholder="Votre niveau d'étude"
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-9 transition-all focus:ring-2 focus:ring-primary ${errors.level ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label htmlFor="school" className="text-sm font-medium">
                    Établissement scolaire
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="school"
                      name="school"
                      type="text"
                      required
                      placeholder="Nom de votre école ou université"
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`pl-9 transition-all focus:ring-2 focus:ring-primary ${errors.school ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.school && <p className="text-sm text-red-500">{errors.school}</p>}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label htmlFor="avatar">Image de profil</label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      onChange={handleAvatarChange}
                      disabled={isLoading}
                      className="pl-9"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Création du compte...' : 'Créer un compte étudiant'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:text-primary/90 transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center">
            <Button variant="link" asChild>
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default StudentSignUp; 