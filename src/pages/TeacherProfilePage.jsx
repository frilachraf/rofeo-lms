import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeacherAccountById, editTeacherAccount, deleteTeacherAccount } from "../services/teacherService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { useSupabaseUpload } from "../hooks/use-supabase-upload";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TeacherProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { setFiles, onUpload, uploadedFilesWithUrls } = useSupabaseUpload({
    bucketName: "rofeofiles",
    path: `avatars/${user?.id}`,
    maxFiles: 1,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    avatar_url: user?.avatar || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [teacherProfile, setTeacherProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchTeacherProfile = async () => {
        const { data, error } = await getTeacherAccountById(user.id);
        if (error) {
          console.error("Error fetching teacher profile:", error);
          toast.error("Erreur lors de la récupération du profil de l'enseignant.");
          return;
        }
        setTeacherProfile(data);
        console.log("Teacher profile fetched:", data);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          bio: data.bio || "",
          avatar_url: data.avatar || "",
        });
      };
      fetchTeacherProfile();
    }
  }, [user]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.full_name) newErrors.full_name = "Le nom complet est requis.";
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email invalide.";
    if (!formData.bio) newErrors.bio = "La biographie est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    let avatarUrl = formData.avatar_url;

    if (file) {
      await onUpload();
      if (uploadedFilesWithUrls.length > 0 && uploadedFilesWithUrls[0].publicUrl) {
        avatarUrl = uploadedFilesWithUrls[0].publicUrl;
      } else {
        toast.error("Erreur lors du téléchargement de l'avatar.");
        setLoading(false);
        return;
      }
    }

    const updates = {
      full_name: formData.full_name,
      email: formData.email,
      bio: formData.bio,
      avatar: avatarUrl,
    };

    const { data, error } = await editTeacherAccount(user.id, updates);
    if (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      console.error("Update error:", error.message);
    } else {
      toast.success("Profil mis à jour avec succès !");
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        const { error } = await deleteTeacherAccount(user.id);
        if (error) throw error;
        toast.success("Compte supprimé avec succès. Redirection...");
        signOut();
        navigate("/login");
      } catch (error) {
        console.error("Delete account error:", error);
        toast.error("Erreur lors de la suppression du compte.");
      }
    }
  };

  if (!teacherProfile) return <div>Chargement du profil...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={formData.avatar_url || "/placeholder-avatar.jpg"} />
              <AvatarFallback>
                {formData.full_name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {formData.full_name}
              </h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="avatar">Changer l'avatar</Label>
            <Input id="avatar" type="file" onChange={handleFileChange} />
          </div>

          <div>
            <Label htmlFor="full_name">Nom complet</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={errors.full_name ? "border-red-500" : ""}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className={errors.bio ? "border-red-500" : ""}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Mise à jour..." : "Mettre à jour le profil"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Supprimer le Compte</h2>
        <p className="text-gray-600 mb-4">
          Cette action est irréversible. Toutes vos données seront supprimées.
        </p>
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Supprimer le Compte
        </Button>
      </div>
    </div>
  );
}
