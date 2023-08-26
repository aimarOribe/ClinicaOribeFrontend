import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/acceso';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ){
    this.formulario = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      clave: ["", [Validators.required]]
    });
  }

  iniciarSesion(){
    this.mostrarLoading = true;
    const login: Login = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave
    };
    this._usuarioServicio.iniciarSesion(login).subscribe({
      next: (response) => {
        if(response.status){
          this._utilidadServicio.guardarSesionUsuario(response.data);
          if(response.data.reestablecer == 1){
            this.router.navigate(['/reset-password'])
          }else{
            this.router.navigate(['/pages']);
          }
        }
      },
      error: (error) => {
        console.log(error);
        this.mostrarLoading = false;
        this._utilidadServicio.mostrarAlerta(error.error.msg, "Opps!");
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    });
  }

}
