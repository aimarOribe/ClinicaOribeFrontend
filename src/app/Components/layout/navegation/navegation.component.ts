import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Sesion } from 'src/app/Interfaces/sesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent  implements OnInit{

  public sesionUsuario: Sesion;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private _utilidadServicio: UtilidadService,
    private router: Router
  ){
    this.sesionUsuario = this._utilidadServicio.obtenerSesionUsuario();
  }
  
  ngOnInit() {}

  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['/login']);
  }

}
