import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, ResetPassword } from 'src/app/Interfaces/acceso';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  formulario: FormGroup;
  ocultarClaveActual: boolean = true;
  ocultarClaveNueva: boolean = true;
  ocultarConfirmarClaveNueva: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ){
    this.formulario = this.fb.group({
      claveActual: ["", [Validators.required]],
      claveNueva: ["", [Validators.required]],
      confirmarClaveNueva: ["", [Validators.required]]
    });
  }

  resetPassword(){
    this.mostrarLoading = true;

    if(this.formulario.value.claveNueva != this.formulario.value.confirmarClaveNueva){
      this._utilidadServicio.mostrarAlerta("Las contraseñas no son las correctas", "Exito!");
      this.mostrarLoading = false;
      return;
    }

    const resetPassword: ResetPassword = {
      idUsuario: this._utilidadServicio.obtenerUsuarioId(),
      claveAntigua: this.formulario.value.claveActual,
      claveNueva: this.formulario.value.claveNueva
    };
    this._usuarioServicio.nuevaClave(resetPassword).subscribe({
      next: (response) => {
        if(response.status){
          this._utilidadServicio.mostrarAlerta("Su clave fue establecida Correctamente", "Exito!");
          this.router.navigate(['/pages']);
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
