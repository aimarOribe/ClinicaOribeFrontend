import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Especialidad } from 'src/app/Interfaces/especialidad';
import { EspecialidadService } from 'src/app/Services/especialidad.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Cita } from 'src/app/Interfaces/cita';

@Component({
  selector: 'app-modal-detalle-cita',
  templateUrl: './modal-detalle-cita.component.html',
  styleUrls: ['./modal-detalle-cita.component.css']
})
export class ModalDetalleCitaComponent implements OnInit {

  formulario: FormGroup;
  cargando: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public datos: Cita,
    private fb: FormBuilder){
      this.formulario = this.fb.group({
        dniPaciente: [""],
        nombrePaciente: [""],
        apellidoPaciente: [""],
        nombreDoctor: [""],
        apellidoDoctor: [""],
        nombreEspecialidad: [""],
        fechaHoraInicio: [""],
        fechaHoraFin: [""],
        descripcion: [""]
      });
  }

  ngOnInit() {
    if(this.datos != null){
      this.formulario.patchValue({
        dniPaciente: this.datos.dniPaciente,
        nombrePaciente: this.datos.nombrePaciente,
        apellidoPaciente: this.datos.apellidoPaciente,
        nombreDoctor: this.datos.nombreDoctor,
        apellidoDoctor: this.datos.apellidoDoctor,
        nombreEspecialidad: this.datos.nombreEspecialidad,
        fechaHoraInicio: this.formatDateTimeForInput(this.datos.fechaInicio),
        fechaHoraFin: this.formatDateTimeForInput(this.datos.fechaFin),
        descripcion: this.datos.descripcion
      })
    }
  }

  formatDateTimeForInput(dateTime: string): string {
    const parts = dateTime.split(' ');
    const dateParts = parts[0].split('-');
    const timeParts = parts[1].split(':');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}`;
  }

}
