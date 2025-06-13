import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from 'framer-motion';
import { Mail, User, Lock, GraduationCap, School } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signUpStudent } from '../services/supabase';

const StudentSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    level: '',
    school: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await signUpStudent(formData)
      toast.success('Inscription réussie');
      navigate('/student/');
    } catch (error) {
      console.error('Sign up error:', error.message);
      toast.error('Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:885180530. */}
      <Card className="max-w-lg mx-auto my-20 p-4">
        <CardHeader>
          <CardTitle>Créer un compte étudiant</CardTitle>
          <CardDescription>Veuillez remplir les informations ci-dessous.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div>
              <label className="block mb-1">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="pl-10"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="pl-10"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label className="block mb-1">Niveau</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="Ex: Terminale, 2ème année, etc."
                  className="pl-10"
                />
              </div>
              {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
            </div>

            <div>
              <label className="block mb-1">Établissement</label>
              <div className="relative mb-4">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Nom de l'établissement"
                  className="pl-10"
                />
              </div>
              {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className='w-full'>
              {isLoading ? 'Chargement...' : 'Créer un compte'}
            </Button>
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Vous avez déjà un compte ?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default StudentSignUp;
