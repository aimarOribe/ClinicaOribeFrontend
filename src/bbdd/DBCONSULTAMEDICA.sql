create database DBCITASMEDICAS
go
use DBCITASMEDICAS
go
create table ROL(
	IdRol int primary key identity,
	Nombre varchar(50)
)
go
create table MENU(
	IdMenu int primary key identity,
	Nombre varchar(50),
	Icono varchar(50),
	url varchar(50)
)
go
create table MENUROL(
	IdMenuRol int primary key identity,
	IdMenu int references MENU(IdMenu),
	IdRol int references ROL(IdRol)
)
go
create table CONFIGURACION(
	Recurso varchar(50),
	Propiedad varchar(50),
	Valor varchar(60)
)
go
create table ESPECIALIDAD(
	IdEspecialidad int primary key identity,
	Nombre varchar(500)
)
go
create table USUARIO(
	IdUsuario int primary key identity,
	IdRol int references ROL(IdRol),
	NombreUsuario varchar(255),
	Correo varchar(255),
	Clave varchar(555),
	Reestablecer bit default 1,
	Activo bit default 1,
	FechaRegistro datetime default getDate()
)
go
create table PERSONA(
	IdPersona int primary key identity,
	IdUsuario int references USUARIO(IdUsuario),
	Nombres varchar(255),
	Apellidos varchar(255), 
	FechaNacimiento date,
	Celular varchar(100),
	Genero varchar(100),
	Dni varchar(100),
	Activo bit default 1
)
go
create table DOCTOR(
	IdDoctor int primary key identity,
	IdPersona int references PERSONA(IdPersona),
	IdEspecialidad int references ESPECIALIDAD(IdEspecialidad),
	HorarioInicio datetime,
	HorarioFin datetime,
	Activo bit default 1
)
go
create table PACIENTE(
	IdPaciente int primary key identity,
	IdPersona int references PERSONA(IdPersona),
	Activo bit default 1
)
go
create table CITA(
	IdCita int primary key identity,
	IdPaciente int references PACIENTE(IdPaciente),
	IdDoctor int references DOCTOR(IdDoctor),
	FechaInicio datetime,
	FechaFin datetime,
	Descripcion varchar(500),
	Estado int,
	FechaRegistro datetime default getDate()
)
go
create table MEDICAMENTO(
	IdMedicamento int primary key identity,
	Nombre varchar(500),
	Indicaciones varchar(500),
	EfectosSecundarios varchar(500),
)
go
create table MEDICAMENTOCITA(
	IdMedicamentoCita int primary key identity,
	IdCita int references CITA(IdCita),
	IdMedicamento int references MEDICAMENTO(IdMedicamento),
	Cantidad int

)
go
create table HISTORIALCITA(
	IdHistorialCita int primary key identity,
	IdCita int references CITA(IdCita),
	Diagnostico varchar(500),
	Tratamiento varchar(500)
)
go
create table PAGO(
	IdPago int primary key identity,
	IdCita int references CITA(IdCita),
	Monto decimal(10,2),
	FechaPago datetime default getDate(),
	Estado int
)