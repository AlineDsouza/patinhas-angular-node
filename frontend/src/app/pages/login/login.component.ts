import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NgIf,RouterLink,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

//Recebe os dados do formulário
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  
  mensagemErro = "";
  mensagemSucesso = "";

  constructor(private authService: AuthService,private router: Router) {}

  async entrar() {
    if (this.formLogin.invalid) {
      this.mensagemErro = "Preencha todos os campos.";
      return;
    }

    const dados = this.formLogin.value;

    try {
      const resposta: any = await this.authService.login(dados);

      this.mensagemSucesso = resposta.msg;
      this.mensagemErro = "";

      localStorage.setItem('token', resposta.token);
      localStorage.setItem('role', resposta.role);
      localStorage.setItem('nome', resposta.nome);
      localStorage.setItem('email', resposta.email);


      // REDIRECIONAMENTO AUTOMÁTICO
      if (resposta.role === 'admin') {
        this.router.navigate(['/admin']);
        console.log("ROLE:", resposta.role);

      } else {
        this.router.navigate(['/formularioAdocao']);
        console.log("ROLE:", resposta.role);

      }

    } catch (err: any) {
      this.mensagemSucesso = "";
      this.mensagemErro = err.error?.msg || "Erro no login.";
    }
  }
}