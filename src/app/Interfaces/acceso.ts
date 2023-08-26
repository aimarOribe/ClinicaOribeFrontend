export interface Login {
    correo: string,
    clave: string
}

export interface ForgotPassword {
    correo: string
}

export interface ResetPassword {
    idUsuario: number,
    claveAntigua: string,
    claveNueva: string
}
