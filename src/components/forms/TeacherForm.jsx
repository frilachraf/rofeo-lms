import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTeacher, updateTeacher } from "../../services/adminServices"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TeacherForm({ teacher, mode = 'add' }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        full_name: teacher?.full_name || '',
        email: teacher?.email || '',
        password: '',
        bio: teacher?.bio || '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (mode === 'add') {
                const { userAuth, error } = await createTeacher(formData)
                if (error) throw error
            } else {
                const { error } = await updateTeacher(teacher.id, {
                    full_name: formData.full_name,
                    bio: formData.bio,
                })
                if (error) throw error
            }
            navigate('/admin/teachers')
        } catch (error) {
            console.error('Error saving teacher:', error)
            alert('Error saving teacher. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4">
            <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={mode === 'edit'}
                />
            </div>

            {mode === 'add' && (
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                />
            </div>

            <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : mode === 'add' ? 'Ajouter un enseignant' : "Mettre à jour l'enseignant "}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/teachers')}>
                Annuler
                </Button>
            </div>
        </form>
    )
} 