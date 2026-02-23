import * as z from "zod";

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const RegistrationFormSchema = z.object({
  nombres: z.string().min(1, { message: "Los nombres son requeridos" }),
  apellidos: z.string().min(1, { message: "Los apellidos son requeridos" }),
  cedula: z.string().min(1, { message: "El Nro. de Cédula es requerido" }),
  expedicion: z.string().min(1, { message: "El lugar de expedición es requerido" }),
  celular: z.string().min(1, { message: "El Nro. de Celular es requerido" }),
  direccion: z.string().min(1, { message: "La dirección es requerida" }),
  githubUser: z.string().min(1, { message: "El usuario de GitHub es requerido" }),

  fechaNacimiento: z.string({
    error: "La fecha de nacimiento es requerida",
  }).refine((val) => {
    // Validamos que sea una fecha válida antes de calcular la edad
    const date = new Date(val);
    if (isNaN(date.getTime())) return false; 
    
    const age = calculateAge(date);
    return age < 30; // Estrictamente menor a 30
  }, {
    message: "Debes ser estrictamente menor de 30 años para participar o ingresar una fecha válida.",
  }),

  selectedRepos: z.array(z.string())
    .min(1, { message: "Debes seleccionar al menos 1 repositorio público." })
    .max(2, { message: "Solo puedes seleccionar un máximo de 2 repositorios." })
});

export type ApplicantFormValues = z.infer<typeof RegistrationFormSchema>;