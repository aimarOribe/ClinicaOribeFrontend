export interface Usuario {
    idUsuario: number,
    idRol: number,
    rolDescripcion?: string,
    nombreUsuario: string,
    correo: string,
    activo?: number,
    personas: Personas[] 
}

export interface Personas {
    idPersona: number,
    idUsuario: number,
    dni: string,
    nombres: string,
    apellidos: string,
    fechaNacimiento: string,
    celular: string,
    genero: string,
    doctors?: Doctors[],
    pacientes?: Pacientes[]
}

export interface Doctors {
    idDoctor: number,
    idPersona: number,
    idEspecialidad: number,
    especialidadNombre?: string,
    horarioInicio: string,
    horarioFin: string
}

export interface Pacientes {
    idPaciente: number,
    idPersona: number
}
