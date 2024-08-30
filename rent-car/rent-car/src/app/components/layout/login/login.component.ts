import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        console.log(token);
		if(token)
			this.loginService.addToken(token);
        this.router.navigate(['/admin/carros']);
      },
      error: erro => {
        alert('Username ou senha incorretos!');
      }
    });
  }

  navigateToRegister() {
    console.log('Redirecionando para a página de registro');
    this.router.navigate(['/register']);
  }
}
