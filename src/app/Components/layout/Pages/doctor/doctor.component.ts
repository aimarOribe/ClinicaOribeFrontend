import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { Doctors, Usuario } from 'src/app/Interfaces/usuario';
import { DoctorService } from 'src/app/Services/doctor.service';
import { ModalDoctorComponent } from '../../Modal/modal-doctor/modal-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, AfterViewInit {

  cargandoTablaDatos: boolean = false;
  columnasTabla: string[] = ['Dni', 'Nombres','Apellidos','Especialidad','Celular', 'Genero', 'Correo', 'Estado','Acciones'];
  dataLista = new MatTableDataSource<Doctors>();

  constructor(private dialog: MatDialog,
    private _doctorServicio: DoctorService,
    private _utilidadServicio: UtilidadService){}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataLista.paginator = this.paginacionTabla;
  }

  ngOnInit() {
    this.obtenerDoctores();
  }

  obtenerDoctores(){
    this.cargandoTablaDatos = true;
    this._doctorServicio.listar().subscribe({
      next: (response) => {
        if(response.status){
          this.dataLista.data = response.data;
          console.log(response.data);
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
    this.dialog.open(ModalDoctorComponent, {
      disableClose: true,
      width: "800px"
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerDoctores();
    });
  }

  editarUsuario(usuario: Usuario){
    this.dialog.open(ModalDoctorComponent, {
      disableClose: true,
      width: "800px",
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerDoctores();
    });
  }

  activar(idDoctor: number, nombreUsuario: string){
    Swal.fire({
      title: "¿Desea Activar al Doctor?",
      text: nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, Activar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._doctorServicio.activar(idDoctor).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Doctor Activado Correctamente", "Exito");
              this.obtenerDoctores();
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

  desactivar(idDoctor: number, nombreUsuario: string){
    Swal.fire({
      title: "¿Desea Desactivar al Doctor?",
      text: nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._doctorServicio.desactivar(idDoctor).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Doctor Desactivado Correctamente", "Exito");
              this.obtenerDoctores();
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
      title: "¿Desea eliminar el Doctor?",
      text: usuario.nombreUsuario,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._doctorServicio.eliminar(usuario.personas[0].doctors![0].idDoctor).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Doctor Eliminado Correctamente", "Exito");
              this.obtenerDoctores();
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
