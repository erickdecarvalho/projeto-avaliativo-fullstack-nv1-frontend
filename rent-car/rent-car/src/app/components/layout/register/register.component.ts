import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  usuario: Usuario = new Usuario();

  constructor(private loginService: LoginService, private router: Router) {}

  registrar() {
    this.loginService.registrar(this.usuario).subscribe(
      response => {
        alert("Usuário cadastro com sucesso. Retornando para o login");
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        alert('Falha no registro. Tente novamente.');
      }
    );
  }
}
