import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { Doctors } from 'src/app/Interfaces/usuario';
import { CitaService } from 'src/app/Services/cita.service';
import { ModalCitaComponent } from '../../Modal/modal-cita/modal-cita.component';
import { Cita } from 'src/app/Interfaces/cita';
import { ModalDetalleCitaComponent } from '../../Modal/modal-detalle-cita/modal-detalle-cita.component';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent  implements OnInit, AfterViewInit {

  cargandoTablaDatos: boolean = false;
  columnasTabla: string[] = ['Paciente','Doctor', 'FechayHoraInicio','FechayHoraFin', 'Estado', 'Acciones'];
  dataLista = new MatTableDataSource<Doctors>();

  constructor(private dialog: MatDialog,
    private _citaServicio: CitaService,
    private _utilidadServicio: UtilidadService){}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit() {
    this.dataLista.paginator = this.paginacionTabla;
  }

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas(){
    this.cargandoTablaDatos = true;
    this._citaServicio.listar().subscribe({
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

  nuevo(){
    this.dialog.open(ModalCitaComponent, {
      disableClose: true,
      width: "1000px"
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerCitas();
    });
  }

  verDetalle(cita: Cita){
    console.log(cita);
    this.dialog.open(ModalDetalleCitaComponent, {
      disableClose: true,
      data: cita
    }).afterClosed().subscribe(resultado => {
      if(resultado == "true") this.obtenerCitas();
    });
  }

  aprobar(idCita: number){
    Swal.fire({
      title: "¿Desea Aprobar la Cita?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, Aprobar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._citaServicio.Aprobar(idCita).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Cita Aprobada Correctamente", "Exito");
              this.obtenerCitas();
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

  rechazar(idCita: number){
    Swal.fire({
      title: "¿Desea Rechazar la cita?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this._citaServicio.Rechazar(idCita).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("Cita Rechazada Correctamente", "Exito");
              this.obtenerCitas();
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

}
