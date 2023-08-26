export interface Cita {
    idCita: number,
    idPaciente: number,
    dniPaciente?: string,
    apellidoPaciente?: string,
    nombrePaciente?: string,
    idDoctor: number,
    nombreDoctor?: string,
    apellidoDoctor?: string,
    nombreEspecialidad?: string,
    fechaInicio: string,
    fechaFin: string,
    descripcion: string,
    estado: number
}