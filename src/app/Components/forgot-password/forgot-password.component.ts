import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from 'src/app/Interfaces/acceso';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

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
    });
  }

  forgotPassword(){
    this.mostrarLoading = true;
    const forgotPassword: ForgotPassword = {
      correo: this.formulario.value.correo
    };
    this._usuarioServicio.reestablecerClave(forgotPassword).subscribe({
      next: (response) => {
        if(response.status){
          this._utilidadServicio.mostrarAlerta("Contraseña Reestablecida, Revise su correo", "Exito!")
          this.router.navigate(['/login']);
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
