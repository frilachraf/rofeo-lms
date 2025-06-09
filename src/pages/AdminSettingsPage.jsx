import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Bell, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function AdminSettingsPage() {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 p-6 md:p-8"
        >
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/admin/home")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Paramètres</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gérez les paramètres généraux de la plateforme.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Profil de l'Administrateur</CardTitle>
                            <p className="text-sm text-muted-foreground">Mettez à jour vos informations personnelles.</p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full justify-start">
                                <User className="h-4 w-4 mr-2" />
                                Gérer mon Profil
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Paramètres de Sécurité</CardTitle>
                            <p className="text-sm text-muted-foreground">Gérez les options de sécurité et de confidentialité.</p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full justify-start">
                                <Lock className="h-4 w-4 mr-2" />
                                Changer le Mot de Passe
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                            <p className="text-sm text-muted-foreground">Configurez vos préférences de notification.</p>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full justify-start">
                                <Bell className="h-4 w-4 mr-2" />
                                Gérer les Notifications
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
} 