import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { PacienteComponent } from './Pages/paciente/paciente.component';
import { DoctorComponent } from './Pages/doctor/doctor.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavegationComponent } from './navegation/navegation.component';
import { ModalPacienteComponent } from './Modal/modal-paciente/modal-paciente.component';
import { ModalDoctorComponent } from './Modal/modal-doctor/modal-doctor.component';
import { ModalActivarComponent } from './Modal/modal-activar/modal-activar.component';
import { ModalDesactivarComponent } from './Modal/modal-desactivar/modal-desactivar.component';
import { CitaComponent } from './Pages/cita/cita.component';
import { ModalCitaComponent } from './Modal/modal-cita/modal-cita.component';
import { ModalDetalleCitaComponent } from './Modal/modal-detalle-cita/modal-detalle-cita.component';


@NgModule({
  declarations: [
    PacienteComponent,
    DoctorComponent,
    DashboardComponent,
    ModalPacienteComponent,
    ModalDoctorComponent,
    ModalActivarComponent,
    ModalDesactivarComponent,
    CitaComponent,
    ModalCitaComponent,
    ModalDetalleCitaComponent,
  ],
  
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LayoutModule { }
