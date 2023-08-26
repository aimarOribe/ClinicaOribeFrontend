import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { Pacientes, Usuario } from 'src/app/Interfaces/usuario';
import { PacienteService } from 'src/app/Services/paciente.service';
import { ModalPacienteComponent } from '../../Modal/modal-paciente/modal-paciente.component';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, AfterViewInit {

  cargandoTablaDatos: boolean = false;
  columnasTabla: string[] = ['Dni', 'Nombres','Apellidos','FechaNacimineto','Celular', 'Genero', 'Correo', 'Estado','Acciones'];
  dataLista = new MatTableDataSource<Pacientes>();

  constructor(private dialog: MatDialog,
    private _pacienteServicio: PacienteService,
    private _utilidadServicio: UtilidadService){}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataLista.paginator = this.paginacionTabla;
  }

  ngOnInit() {
    this.obtenerPacientes();
  }

  obtenerPacientes(){
    this.cargandoTablaDatos = true;
    this._pacienteServicio.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.dataLista.data = response.data;
        }else{
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Opps!");
        }       
      },
      error: (error) => {
        this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
      },
      complete: () => {
        this.cargandoTablaDatos = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataLista.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario(){
    this.dialog.open(ModalPacienteComponent, {
      disableClose: true,
      width: "800px"
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerPacientes();
    });
  }

  editarUsuario(usuario: Usuario){
    this.dialog.open(ModalPacienteComponent, {
      disableClose: true,
      width: "800px",
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerPacientes();
    });
  }

  desactivar(idPaciente: number, nombreUsuario: string){
    Swal.fire({
      title: "¿Desea Desactivar al Paciente?",
      text: nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._pacienteServicio.desactivar(idPaciente).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Paciente Desactivado Correctamente", "Exito");
              this.obtenerPacientes();
            }else{
              this._utilidadServicio.mostrarAlerta("Ocurrio un error", "Error");
            }
          },
          error: (error) => {
            console.log(error);
            this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
          }
        })
      }
    })
  }

  activar(idPaciente: number, nombreUsuario: string){
    Swal.fire({
      title: "¿Desea Activar al Paciente?",
      text: nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, Activar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._pacienteServicio.activar(idPaciente).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Paciente Activado Correctamente", "Exito");
              this.obtenerPacientes();
            }else{
              this._utilidadServicio.mostrarAlerta("Ocurrio un error", "Error");
            }
          },
          error: (error) => {
            console.log(error);
            this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
          }
        })
      }
    })
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: "¿Desea eliminar el usuario?",
      text: usuario.nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._pacienteServicio.eliminar(usuario.personas[0].pacientes![0].idPaciente).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Usuario Eliminado Correctamente", "Exito");
              this.obtenerPacientes();
            }else{
              this._utilidadServicio.mostrarAlerta("Ocurrio un error", "Error");
            }
          },
          error: (error) => {
            this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
          }
        })
      }
    })
  }

}
