import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function AdminReportsPage() {
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
                    <h2 className="text-2xl font-bold">Rapports</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Générez et téléchargez des rapports détaillés sur l'activité de la plateforme.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="shadow-sm hover:shadow-md transition-all duration-200"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Rapports Disponibles</CardTitle>
                        <p className="text-sm text-muted-foreground">Cliquez pour générer un rapport</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Rapport des Inscriptions
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Rapport des Performances
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Rapport Financier
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
} 