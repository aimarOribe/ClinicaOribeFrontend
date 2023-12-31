USE [master]
GO
/****** Object:  Database [DBCITASMEDICAS]    Script Date: 26/08/2023 15:29:34 ******/
CREATE DATABASE [DBCITASMEDICAS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBCITASMEDICAS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DBCITASMEDICAS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DBCITASMEDICAS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DBCITASMEDICAS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DBCITASMEDICAS] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBCITASMEDICAS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBCITASMEDICAS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DBCITASMEDICAS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBCITASMEDICAS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBCITASMEDICAS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DBCITASMEDICAS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBCITASMEDICAS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DBCITASMEDICAS] SET  MULTI_USER 
GO
ALTER DATABASE [DBCITASMEDICAS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBCITASMEDICAS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBCITASMEDICAS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBCITASMEDICAS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DBCITASMEDICAS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DBCITASMEDICAS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DBCITASMEDICAS] SET QUERY_STORE = OFF
GO
USE [DBCITASMEDICAS]
GO
/****** Object:  Table [dbo].[CITA]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CITA](
	[IdCita] [int] IDENTITY(1,1) NOT NULL,
	[IdPaciente] [int] NULL,
	[IdDoctor] [int] NULL,
	[FechaInicio] [datetime] NULL,
	[FechaFin] [datetime] NULL,
	[Descripcion] [varchar](500) NULL,
	[Estado] [int] NULL,
	[FechaRegistro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCita] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CONFIGURACION]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CONFIGURACION](
	[Recurso] [varchar](50) NULL,
	[Propiedad] [varchar](50) NULL,
	[Valor] [varchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DOCTOR]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DOCTOR](
	[IdDoctor] [int] IDENTITY(1,1) NOT NULL,
	[IdPersona] [int] NULL,
	[IdEspecialidad] [int] NULL,
	[HorarioInicio] [datetime] NULL,
	[HorarioFin] [datetime] NULL,
	[Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdDoctor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ESPECIALIDAD]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ESPECIALIDAD](
	[IdEspecialidad] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEspecialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HISTORIALCITA]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HISTORIALCITA](
	[IdHistorialCita] [int] IDENTITY(1,1) NOT NULL,
	[IdCita] [int] NULL,
	[Diagnostico] [varchar](500) NULL,
	[Tratamiento] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHistorialCita] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MEDICAMENTO]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEDICAMENTO](
	[IdMedicamento] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NULL,
	[Indicaciones] [varchar](500) NULL,
	[EfectosSecundarios] [varchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdMedicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MEDICAMENTOCITA]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEDICAMENTOCITA](
	[IdMedicamentoCita] [int] IDENTITY(1,1) NOT NULL,
	[IdCita] [int] NULL,
	[IdMedicamento] [int] NULL,
	[Cantidad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdMedicamentoCita] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MENU]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MENU](
	[IdMenu] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NULL,
	[Icono] [varchar](50) NULL,
	[url] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdMenu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MENUROL]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MENUROL](
	[IdMenuRol] [int] IDENTITY(1,1) NOT NULL,
	[IdMenu] [int] NULL,
	[IdRol] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdMenuRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PACIENTE]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PACIENTE](
	[IdPaciente] [int] IDENTITY(1,1) NOT NULL,
	[IdPersona] [int] NULL,
	[Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PAGO]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PAGO](
	[IdPago] [int] IDENTITY(1,1) NOT NULL,
	[IdCita] [int] NULL,
	[Monto] [decimal](10, 2) NULL,
	[FechaPago] [datetime] NULL,
	[Estado] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSONA]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSONA](
	[IdPersona] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NULL,
	[Nombres] [varchar](255) NULL,
	[Apellidos] [varchar](255) NULL,
	[FechaNacimiento] [date] NULL,
	[Celular] [varchar](100) NULL,
	[Genero] [varchar](100) NULL,
	[Activo] [bit] NULL,
	[Dni] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPersona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROL]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROL](
	[IdRol] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USUARIO]    Script Date: 26/08/2023 15:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USUARIO](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[IdRol] [int] NULL,
	[NombreUsuario] [varchar](255) NULL,
	[Correo] [varchar](255) NULL,
	[Clave] [varchar](555) NULL,
	[Reestablecer] [bit] NULL,
	[Activo] [bit] NULL,
	[FechaRegistro] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CITA] ON 

INSERT [dbo].[CITA] ([IdCita], [IdPaciente], [IdDoctor], [FechaInicio], [FechaFin], [Descripcion], [Estado], [FechaRegistro]) VALUES (1, 2005, 1002, CAST(N'2023-05-02T00:00:00.000' AS DateTime), CAST(N'2023-05-03T00:00:00.000' AS DateTime), N'Test', 2, CAST(N'2023-08-24T14:10:19.423' AS DateTime))
INSERT [dbo].[CITA] ([IdCita], [IdPaciente], [IdDoctor], [FechaInicio], [FechaFin], [Descripcion], [Estado], [FechaRegistro]) VALUES (2, 2005, 1005, CAST(N'2023-05-12T15:20:00.000' AS DateTime), CAST(N'2023-05-12T16:20:00.000' AS DateTime), N'TESTTTT', 2, CAST(N'2023-08-24T17:36:40.760' AS DateTime))
INSERT [dbo].[CITA] ([IdCita], [IdPaciente], [IdDoctor], [FechaInicio], [FechaFin], [Descripcion], [Estado], [FechaRegistro]) VALUES (3, 2005, 1005, CAST(N'2023-05-14T04:50:00.000' AS DateTime), CAST(N'2023-05-14T04:55:00.000' AS DateTime), N'TEDSTTTT', 3, CAST(N'2023-08-24T17:39:19.810' AS DateTime))
INSERT [dbo].[CITA] ([IdCita], [IdPaciente], [IdDoctor], [FechaInicio], [FechaFin], [Descripcion], [Estado], [FechaRegistro]) VALUES (4, 2005, 1004, CAST(N'2023-02-05T01:50:00.000' AS DateTime), CAST(N'2023-02-05T01:55:00.000' AS DateTime), N'ttttt', 3, CAST(N'2023-08-25T09:24:07.950' AS DateTime))
SET IDENTITY_INSERT [dbo].[CITA] OFF
GO
SET IDENTITY_INSERT [dbo].[DOCTOR] ON 

INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1002, 2008, 1, CAST(N'2023-08-22T00:00:00.000' AS DateTime), CAST(N'2023-08-30T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1003, 2009, 2, CAST(N'2023-08-22T00:00:00.000' AS DateTime), CAST(N'2023-08-30T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1004, 2010, 1, CAST(N'2023-08-08T00:00:00.000' AS DateTime), CAST(N'2023-08-30T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1005, 2012, 2, CAST(N'2023-08-22T00:00:00.000' AS DateTime), CAST(N'2023-08-28T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1006, 2013, 3, CAST(N'2023-08-22T00:00:00.000' AS DateTime), CAST(N'2023-08-29T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[DOCTOR] ([IdDoctor], [IdPersona], [IdEspecialidad], [HorarioInicio], [HorarioFin], [Activo]) VALUES (1007, 2015, 3, CAST(N'2023-08-22T00:00:00.000' AS DateTime), CAST(N'2023-08-29T00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[DOCTOR] OFF
GO
SET IDENTITY_INSERT [dbo].[ESPECIALIDAD] ON 

INSERT [dbo].[ESPECIALIDAD] ([IdEspecialidad], [Nombre]) VALUES (1, N'Pediatra')
INSERT [dbo].[ESPECIALIDAD] ([IdEspecialidad], [Nombre]) VALUES (2, N'Cardiologo')
INSERT [dbo].[ESPECIALIDAD] ([IdEspecialidad], [Nombre]) VALUES (3, N'Ginecologo')
SET IDENTITY_INSERT [dbo].[ESPECIALIDAD] OFF
GO
SET IDENTITY_INSERT [dbo].[MENU] ON 

INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (1, N'DashBoard', N'dashboard', N'/pages/dashboard')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (2, N'Usuarios', N'group', N'/pages/usuarios')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (3, N'Productos', N'collections_bookmark', N'/pages/productos')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (4, N'Venta', N'currency_exchange', N'/pages/venta')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (5, N'Historial Ventas', N'edit_note', N'/pages/historial_venta')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (6, N'Reportes', N'receipt', N'/pages/reportes')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (7, N'DashBoard', N'dashboard', N'/pages/dashboard')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (8, N'Usuarios', N'group', N'/pages/usuarios')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (9, N'Productos', N'collections_bookmark', N'/pages/productos')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (10, N'Venta', N'currency_exchange', N'/pages/venta')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (11, N'Historial Ventas', N'edit_note', N'/pages/historial_venta')
INSERT [dbo].[MENU] ([IdMenu], [Nombre], [Icono], [url]) VALUES (12, N'Reportes', N'receipt', N'/pages/reportes')
SET IDENTITY_INSERT [dbo].[MENU] OFF
GO
SET IDENTITY_INSERT [dbo].[MENUROL] ON 

INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (4, 1, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (5, 2, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (6, 3, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (7, 4, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (8, 5, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (9, 6, 1)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (10, 4, 2)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (11, 5, 2)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (12, 3, 3)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (13, 4, 3)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (14, 5, 3)
INSERT [dbo].[MENUROL] ([IdMenuRol], [IdMenu], [IdRol]) VALUES (15, 6, 3)
SET IDENTITY_INSERT [dbo].[MENUROL] OFF
GO
SET IDENTITY_INSERT [dbo].[PACIENTE] ON 

INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2005, 2006, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2006, 2007, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2007, 2011, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2008, 2014, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2009, 2016, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2010, 2017, 1)
INSERT [dbo].[PACIENTE] ([IdPaciente], [IdPersona], [Activo]) VALUES (2011, 2018, 1)
SET IDENTITY_INSERT [dbo].[PACIENTE] OFF
GO
SET IDENTITY_INSERT [dbo].[PERSONA] ON 

INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2004, 2010, N'Aimar Glover', N'Oribe Vigo', CAST(N'2003-01-25' AS Date), N'970713168', N'Masculino', 1, NULL)
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2006, 2012, N'aimar', N'tecsup', CAST(N'2023-08-21' AS Date), N'965214001', N'Masculino', 1, N'1')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2007, 2013, N'sdfsdf', N'dsfsdf', CAST(N'2023-08-22' AS Date), N'998745123', N'Masculino', 1, N'2')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2008, 2014, N'car', N'los', CAST(N'2023-08-22' AS Date), N'987645645', N'Masculino', 1, N'457777777')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2009, 2015, N'car', N'los', CAST(N'2023-08-22' AS Date), N'987645645', N'Masculino', 1, N'45')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2010, 2016, N'fgfgfgf', N'sdfsdffff', CAST(N'2023-08-22' AS Date), N'978645456', N'Masculino', 1, N'65')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2011, 2017, N'gggg', N'fff', CAST(N'2023-08-22' AS Date), N'978675456', N'Masculino', 1, N'3')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2012, 2018, N'uuu', N'yyy', CAST(N'2023-08-30' AS Date), N'978978978', N'Masculino', 1, N'8787')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2013, 2019, N'yh', N'yh', CAST(N'2023-08-14' AS Date), N'978978978', N'Masculino', 1, N'88')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2014, 2020, N'hh', N'hh', CAST(N'2023-08-21' AS Date), N'987978978', N'Masculino', 1, N'4')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2015, 2021, N'mn', N'mn', CAST(N'2023-08-22' AS Date), N'978978978', N'Masculino', 1, N'789')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2016, 2022, N'hj', N'hj', CAST(N'2023-08-22' AS Date), N'978978978', N'Femenino', 1, N'5')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2017, 2023, N'Paco', N'Gomez', CAST(N'2023-08-25' AS Date), N'987978978', N'Masculino', 1, N'72402433')
INSERT [dbo].[PERSONA] ([IdPersona], [IdUsuario], [Nombres], [Apellidos], [FechaNacimiento], [Celular], [Genero], [Activo], [Dni]) VALUES (2018, 2024, N'fgdf', N'dfgdfg', CAST(N'2023-08-29' AS Date), N'987978987', N'Masculino', 1, N'657')
SET IDENTITY_INSERT [dbo].[PERSONA] OFF
GO
SET IDENTITY_INSERT [dbo].[ROL] ON 

INSERT [dbo].[ROL] ([IdRol], [Nombre]) VALUES (1, N'Administrador')
INSERT [dbo].[ROL] ([IdRol], [Nombre]) VALUES (2, N'Paciente')
INSERT [dbo].[ROL] ([IdRol], [Nombre]) VALUES (3, N'Doctor')
SET IDENTITY_INSERT [dbo].[ROL] OFF
GO
SET IDENTITY_INSERT [dbo].[USUARIO] ON 

INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2010, 1, N'admin', N'aimaroribevigo@gmail.com', N'8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 0, 1, CAST(N'2023-08-23T15:44:53.870' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2012, 2, N'aimartecsup', N'aimar.oribe@tecsup.edu.pe', N'88fe06a87cbce1ac489d8302e30090710c684f595cd0ae78ea302469b5b8319d', 1, 1, CAST(N'2023-08-23T17:24:27.690' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2013, 2, N'sdfsdf', N'oribe.vigo.aimar@gmail.com', N'61fd62465ea4b75d2b79e245ee2eba4bda0686f7a5206f62beca858cb01a9863', 1, 1, CAST(N'2023-08-23T17:43:48.167' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2014, 3, N'carlos', N'casdasdda@gmail.com', N'f191c3179423568e290745bc4a340db6ae4c9ad026936f70d06e485ef36b8be5', 1, 1, CAST(N'2023-08-23T18:25:45.180' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2015, 3, N'carlosj', N'asdasdda@gmail.com', N'602b1dbf5474ceb296a551a637e7ff893697624e5636b7527bd20a5586387d1e', 1, 1, CAST(N'2023-08-23T18:25:46.587' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2016, 3, N'sdfsdfsdf', N'sdfdsfsd@gmail.com', N'e21f40463b0207aaf28db2649d1d5e440379f6874a2a7b9c00fbd7ae67ce88b7', 1, 1, CAST(N'2023-08-23T18:29:31.920' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2017, 2, N'gfgfgf', N'trtrtrtr@gmail.com', N'e08d8a0a474c4394889b389fb61ae83f77362deb28550c769da781be9481406b', 1, 1, CAST(N'2023-08-23T18:33:32.773' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2018, 3, N'uuyy', N'uuyyy@gmail.com', N'32432703f21feb1adfdf22a26e73ad24a862e584faf264ba7f3a2236ca5ba098', 1, 1, CAST(N'2023-08-23T18:40:39.483' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2019, 3, N'yh', N'yh@gmail.com', N'7d36405b652dce045f897b73fe189c3138265020b4f8a9587749de293b5ba9fc', 1, 1, CAST(N'2023-08-23T18:43:26.237' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2020, 2, N'hh', N'hh@gmail.com', N'5a8d0597002383855c4d5a2d804c8d1266f18f0eab8f04ae7322baac8990b6e3', 1, 1, CAST(N'2023-08-23T18:44:17.533' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2021, 3, N'mn', N'mn@gmail.com', N'cdae30c66c479384eb6592ecb71a07007de00546e902ba2137e9e28936b9d19d', 1, 1, CAST(N'2023-08-23T18:50:18.750' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2022, 2, N'hj', N'hj@gmail.com', N'84b7cfa68769a173861a119a21449bc71cfb988128a610c2a09f104db72ef8a4', 1, 1, CAST(N'2023-08-23T18:51:03.343' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2023, 2, N'pacoGomez', N'dasdasdasd@gmail.com', N'ed4ad8716177ed537d70d71b28c04ab13c777adaa660b80c0c91f7c1e6ddf1e4', 1, 1, CAST(N'2023-08-25T11:30:29.390' AS DateTime))
INSERT [dbo].[USUARIO] ([IdUsuario], [IdRol], [NombreUsuario], [Correo], [Clave], [Reestablecer], [Activo], [FechaRegistro]) VALUES (2024, 2, N'aimartecsupdd', N'assssimar@gmail.com', N'62b2f9e2f266bcb513cccf0877604b1c7ff8497adfb41633f2724939a9e8ed56', 1, 1, CAST(N'2023-08-25T18:20:34.180' AS DateTime))
SET IDENTITY_INSERT [dbo].[USUARIO] OFF
GO
ALTER TABLE [dbo].[CITA] ADD  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[DOCTOR] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[PACIENTE] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[PAGO] ADD  DEFAULT (getdate()) FOR [FechaPago]
GO
ALTER TABLE [dbo].[PERSONA] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[USUARIO] ADD  DEFAULT ((1)) FOR [Reestablecer]
GO
ALTER TABLE [dbo].[USUARIO] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[USUARIO] ADD  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[CITA]  WITH CHECK ADD FOREIGN KEY([IdDoctor])
REFERENCES [dbo].[DOCTOR] ([IdDoctor])
GO
ALTER TABLE [dbo].[CITA]  WITH CHECK ADD FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[PACIENTE] ([IdPaciente])
GO
ALTER TABLE [dbo].[DOCTOR]  WITH CHECK ADD FOREIGN KEY([IdEspecialidad])
REFERENCES [dbo].[ESPECIALIDAD] ([IdEspecialidad])
GO
ALTER TABLE [dbo].[DOCTOR]  WITH CHECK ADD FOREIGN KEY([IdPersona])
REFERENCES [dbo].[PERSONA] ([IdPersona])
GO
ALTER TABLE [dbo].[HISTORIALCITA]  WITH CHECK ADD FOREIGN KEY([IdCita])
REFERENCES [dbo].[CITA] ([IdCita])
GO
ALTER TABLE [dbo].[MEDICAMENTOCITA]  WITH CHECK ADD FOREIGN KEY([IdCita])
REFERENCES [dbo].[CITA] ([IdCita])
GO
ALTER TABLE [dbo].[MEDICAMENTOCITA]  WITH CHECK ADD FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[MEDICAMENTO] ([IdMedicamento])
GO
ALTER TABLE [dbo].[MENUROL]  WITH CHECK ADD FOREIGN KEY([IdMenu])
REFERENCES [dbo].[MENU] ([IdMenu])
GO
ALTER TABLE [dbo].[MENUROL]  WITH CHECK ADD FOREIGN KEY([IdRol])
REFERENCES [dbo].[ROL] ([IdRol])
GO
ALTER TABLE [dbo].[PACIENTE]  WITH CHECK ADD FOREIGN KEY([IdPersona])
REFERENCES [dbo].[PERSONA] ([IdPersona])
GO
ALTER TABLE [dbo].[PAGO]  WITH CHECK ADD FOREIGN KEY([IdCita])
REFERENCES [dbo].[CITA] ([IdCita])
GO
ALTER TABLE [dbo].[PERSONA]  WITH CHECK ADD FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[USUARIO] ([IdUsuario])
GO
ALTER TABLE [dbo].[USUARIO]  WITH CHECK ADD FOREIGN KEY([IdRol])
REFERENCES [dbo].[ROL] ([IdRol])
GO
USE [master]
GO
ALTER DATABASE [DBCITASMEDICAS] SET  READ_WRITE 
GO
