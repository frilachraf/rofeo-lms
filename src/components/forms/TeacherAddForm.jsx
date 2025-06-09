import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { At, Lock, Tag, TextT, User } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { createTeacher } from '../../services/adminServices';

const TeacherAddForm = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    bio: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createTeacher(formData);
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création de l'enseignant :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = {
    fullName: {
      label: "Nom complet",
      name: 'full_name',
      placeholder: "Entrez le nom complet de l'enseignant",
    },
    email: {
      label: "Email",
      name: 'email',
      placeholder: "Entrez l'email de l'enseignant",
    },
    password: {
      label: "Mot de passe",
      name: 'password',
      placeholder: "Entrez le mot de passe de l'enseignant",
    },
    bio: {
      label: "Biographie",
      name: 'bio',
      placeholder: "Entrez une brève description de l'enseignant...",
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={formFields.fullName.name}>{formFields.fullName.label}</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={formFields.fullName.name}
            placeholder={formFields.fullName.placeholder}
            className="pl-9"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={formFields.email.name}>{formFields.email.label}</Label>
        <div className="relative">
          <At className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={formFields.email.name}
            type="email"
            placeholder={formFields.email.placeholder}
            className="pl-9"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={formFields.password.name}>{formFields.password.label}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={formFields.password.name}
            type="password"
            placeholder={formFields.password.placeholder}
            className="pl-9"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={formFields.bio.name}>{formFields.bio.label}</Label>
        <div className="relative">
          <TextT className="absolute left-3 top-3 text-muted-foreground" />
          <Textarea
            id={formFields.bio.name}
            placeholder={formFields.bio.placeholder}
            className="pl-9"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Création en cours..." : "Créer l'enseignant"}
      </Button>
    </form>
  );
};

export default TeacherAddForm;
