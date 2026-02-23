import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RegistrationFormSchema } from "../utils/registration-form-schema" 

import { 
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField, 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useGithubRepos } from "../hooks/useGithubRepos";

export function RegistrationForm() {
    const reposList = [
        { id: "1", name: "E-commerce", description: "Lorem ipsum dolor sit amet", stars: 210 },
        { id: "2", name: "Crypto App", description: "Massa purus aptent vehicula", stars: 55 },
        { id: "3", name: "Portfolio", description: "Mi portafolio personal", stars: 12 },
    ];
    const { repos, isLoading, error, fetchRepos } = useGithubRepos();
    const form = useForm<z.infer<typeof RegistrationFormSchema>>({
        resolver: zodResolver(RegistrationFormSchema),
        defaultValues: {
            nombres: "",
            apellidos: "",
            cedula: "",
            expedicion: "",
            celular: "",
            direccion: "",
            githubUser: "",
            // fechaNacimiento y selectedRepos los manejaremos después
        },
    })

    function onSubmit(data: z.infer<typeof RegistrationFormSchema>) {
        console.log("Datos listos para el correo:", data)
    }

    return (
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-4xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <FormField
                        control={form.control}
                        name="nombres"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombres (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Pepito" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="apellidos" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Perez" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fechaNacimiento" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de nacimiento (Requerido)</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cedula" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cédula de Identidad (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. 1234567" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="expedicion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expedición (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. LP" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="celular" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nro. de Celular (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. 77777777" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="direccion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Av. Rosales Nro. 00" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="githubUser"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario de GitHub (Requerido)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. PapePer" {...field} /> 
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />
                    
                </div>

                {/* ... (cierre del <div className="grid...">) ... */}

                    {/* SECCIÓN DE REPOSITORIOS */}
                    <div className="space-y-4 pt-6 border-t">
                        <div>
                            <h3 className="text-lg font-medium">Selecciona tus repositorios</h3>
                            <p className="text-sm text-gray-500">
                                Puedes seleccionar hasta un máximo de 2 repositorios para enviar con tu postulación.
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="selectedRepos"
                            render={() => (
                                <FormItem>
                                    <div className="border rounded-md">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">Seleccionar</TableHead>
                                                    <TableHead>Nombre</TableHead>
                                                    <TableHead>Descripción</TableHead>
                                                    <TableHead className="text-right">Estrellas</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {isLoading && (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                                        Cargando repositorios...
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                            {!isLoading && repos.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                                        Ingresa tu usuario y presiona buscar para ver tus repositorios.
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                            {!isLoading && repos.map((repo) => (
                                                <FormField
                                                    key={repo.id}
                                                    control={form.control}
                                                    name="selectedRepos"
                                                    render={({ field }) => {
                                                        const isChecked = field.value?.includes(repo.name);
                                                        const isMaxSelected = field.value?.length >= 2 && !isChecked;

                                                        return (
                                                            <TableRow>
                                                                <TableCell>
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={isChecked}
                                                                            disabled={isMaxSelected}
                                                                            onCheckedChange={(checked) => {
                                                                                if (checked) {
                                                                                    field.onChange([...(field.value || []), repo.name]);
                                                                                } else {
                                                                                    field.onChange(
                                                                                        field.value?.filter((value: string) => value !== repo.name)
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell className="font-medium">{repo.name}</TableCell>
                                                                <TableCell>{repo.description}</TableCell>
                                                                <TableCell className="text-right">{repo.stars} ⭐</TableCell>
                                                            </TableRow>
                                                        );
                                                    }}
                                                />
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                <Button type="submit" className="w-full md:w-auto">Enviar Postulación</Button>
            </form>
        </Form>
    )
}

export default RegistrationForm;