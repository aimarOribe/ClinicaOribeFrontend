import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { PacienteService } from 'src/app/Services/paciente.service';
import { RolService } from 'src/app/Services/rol.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS}
  ]
})
export class ModalPacienteComponent implements OnInit{

  formulario: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaRoles: Rol[] = [];
  cargando: boolean = false;

  constructor(private modalActual: MatDialogRef<ModalPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _pacienteService: PacienteService,
    private _utilidadServicio: UtilidadService){
      this.formulario = this.fb.group({
        correo: ["", [Validators.required, Validators.email]],
        nombreUsuario: ["", [Validators.required]],
        dni: ["", [Validators.required]],
        nombres: ["", [Validators.required]],
        apellidos: ["", [Validators.required]],
        fechaNacimiento: ["", [Validators.required]],
        celular: ["", [Validators.required]],
        genero: ["", [Validators.required]]
      });

      if(this.datos != null){
        this.tituloAccion = "Editar";
        this.botonAccion = "Actualizar";
      }

      this._rolServicio.listar().subscribe({
        next: (response) => {
          if(response.status){
            this.listaRoles = response.data
          }
        },
        error: (error) => {
          this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
        }
      });
  }

  ngOnInit() {
    if(this.datos != null){
      console.log(this.datos);
      var fechaNacimientoParsed = moment(this.datos.personas[0].fechaNacimiento, 'DD/MM/YYYY');
      this.formulario.patchValue({
        correo: this.datos.correo,
        nombreUsuario: this.datos.nombreUsuario,
        dni: this.datos.personas[0].dni,
        nombres: this.datos.personas[0].nombres,
        apellidos: this.datos.personas[0].apellidos,
        fechaNacimiento: fechaNacimientoParsed.toDate(),
        celular: this.datos.personas[0].celular,
        genero: this.datos.personas[0].genero
      })
    }
  }

  guardarEditar(){

    this.cargando = true;

    const _usuario: Usuario = {
      idUsuario: this.datos == null ? 0 : this.datos.idUsuario,
      correo: this.formulario.value.correo,
      idRol: this.datos == null ? 2 : 0,
      nombreUsuario: this.formulario.value.nombreUsuario,
      personas: [
        {
          idPersona: this.datos == null ? 0 : this.datos.personas[0].idPersona,
          idUsuario: this.datos == null ? 0 : this.datos.personas[0].idUsuario,
          dni: this.formulario.value.dni,
          nombres: this.formulario.value.nombres,
          apellidos: this.formulario.value.apellidos,
          fechaNacimiento: moment(this.formulario.value.fechaNacimiento).format('DD/MM/YYYY'),
          celular: this.formulario.value.celular,
          genero: this.formulario.value.genero,
          pacientes: [
            {
              idPaciente: this.datos == null ? 0 : this.datos.personas[0].pacientes![0].idPaciente,
              idPersona: this.datos == null ? 0 : this.datos.personas[0].pacientes![0].idPersona
            }
          ]
        }
      ]      
    }

    if(this.datos == null){
      _usuario.activo = 1
      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadServicio.mostrarAlerta("Paciente Registrado Correctamente", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrio un error", "Error");
          }
        },
        error: (error) => {
          this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
          this.cargando = false;
        },
        complete: () => {
          this.cargando = false;
        }
      });
    }else{
      this._pacienteService.editar(_usuario).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadServicio.mostrarAlerta("Paciente Editado Correctamente", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrio un error", "Error");
          }
        },
        error: (error) => {
          this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
          this.cargando = false;
        },
        complete: () => {
          this.cargando = false;
        }
      });
    }
  }

}
