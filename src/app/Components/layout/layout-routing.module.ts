import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { PacienteComponent } from './Pages/paciente/paciente.component';
import { DoctorComponent } from './Pages/doctor/doctor.component';
import { CitaComponent } from './Pages/cita/cita.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'pacientes',
        component: PacienteComponent,
      },
      {
        path: 'doctores',
        component: DoctorComponent
      },
      {
        path: 'cita',
        component: CitaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
