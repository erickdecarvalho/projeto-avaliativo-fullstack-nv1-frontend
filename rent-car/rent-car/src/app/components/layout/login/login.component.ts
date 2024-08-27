import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user !: string;
  password !: string;

  router = inject(Router);

  logar() {
    if (this.user == 'admin' && this.password == 'admin') {
      this.router.navigate(['admin/carros']);
    } else {
        alert("usuário ou senha estão incorretos!");
    }
  }
}
