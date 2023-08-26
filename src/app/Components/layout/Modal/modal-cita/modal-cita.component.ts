import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacienteService } from 'src/app/Services/paciente.service';
import { Cita } from 'src/app/Interfaces/cita';
import { CitaService } from 'src/app/Services/cita.service';
import { Especialidad } from 'src/app/Interfaces/especialidad';
import { EspecialidadService } from 'src/app/Services/especialidad.service';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styleUrls: ['./modal-cita.component.css']
})
export class ModalCitaComponent {

  detalleVisto: boolean = true;
  formulario: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaEspecialidades: Especialidad[] = [];
  listaDoctores: Usuario[] = [];

  especialidadActiva: boolean = false;
  idEspecialidad: number = 0;

  cargando: boolean = false;

  constructor(private modalActual: MatDialogRef<ModalCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: Cita,
    private fb: FormBuilder,
    private _citaService: CitaService,
    private _pacienteService: PacienteService,
    private _especialidadService: EspecialidadService,
    private _doctorService: DoctorService,
    private _utilidadServicio: UtilidadService){
      this.formulario = this.fb.group({
        dni: ["", [Validators.required]],
        nombrePaciente: ["", [Validators.required]],
        apellidoPaciente: ["", [Validators.required]],
        idPaciente: ["", [Validators.required]],
        idEspecialidad: ["", [Validators.required]],
        idDoctor: ["", [Validators.required]],
        fechaInicio: ["", [Validators.required]],
        fechaFin: ["", [Validators.required]],
        descripcion: ["", [Validators.required]]
      });

      this.listarActivos();
  }

  buscarPaciente(){
    var dni: string = this.formulario.value.dni;
    this._pacienteService.buscarPorDni(dni).subscribe({
      next: (response) => {
        if(response.status){
          this._utilidadServicio.mostrarAlerta("Paciente Encontrado", "Exito!");
          var pacienteEncontrado: Usuario = response.data;
          this.formulario.patchValue({
            nombrePaciente: pacienteEncontrado.personas[0].nombres,
            apellidoPaciente: pacienteEncontrado.personas[0].apellidos,
            idPaciente: pacienteEncontrado.personas[0].pacientes![0].idPaciente,
          })
        }
      },
      error: (error) => {
        console.log(error);
        this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
      }
    });
  }

  listarActivos(){
    this._especialidadService.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.listaEspecialidades = response.data
        }
      },
      error: (error) => {
        this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
      }
    });
  }

  especialiadElegida(){
    this.especialidadActiva = true;
    this.idEspecialidad = this.formulario.value.idEspecialidad;
    console.log(this.idEspecialidad);
    this.listarDoctoresPorEspecialidadyActivos();
  }

  listarDoctoresPorEspecialidadyActivos(){
    this._doctorService.listarPorEspecialidadyActivos(this.idEspecialidad).subscribe({
      next: (response) => {
        if(response.status){
          this.listaDoctores = response.data
        }
      },
      error: (error) => {
        this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
      }
    });
  }

  formatDateTimeForInput(dateTime: string): string {
    const parts = dateTime.split(' ');
    const dateParts = parts[0].split('-');
    const timeParts = parts[1].split(':');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}`;
  }

  guardar(){

    this.cargando = true;

    const _cita: Cita = {
      idCita: 0,
      idPaciente: this.formulario.value.idPaciente,
      idDoctor: this.formulario.value.idDoctor,
      fechaInicio: this.formulario.value.fechaInicio,
      fechaFin: this.formulario.value.fechaFin,
      descripcion: this.formulario.value.descripcion,
      estado: 1
    }

    this._citaService.Crear(_cita).subscribe({
      next: (data) => {
        if(data.status){
          this._utilidadServicio.mostrarAlerta("Cita Registrada Correctamente", "Exito");
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
