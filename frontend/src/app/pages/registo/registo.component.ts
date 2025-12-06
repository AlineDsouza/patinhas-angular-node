import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registo',
  imports: [ReactiveFormsModule, NgIf, CommonModule,RouterLink],
  templateUrl: './registo.component.html',
  styleUrl: './registo.component.css'
})
export class RegistoComponent {
mensagemSucesso = '';
  mensagemErro = '';

  formRegisto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmaSenha: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {}

registrar() {
  if (this.formRegisto.invalid) {
    this.mensagemErro = "Preencha todos os campos corretamente.";
    return;
  }

  const dados = this.formRegisto.value;

  this.authService.registrar(dados).subscribe({
    next: (res: any) => {
      this.mensagemSucesso = res.msg || "Registado com sucesso!";
      this.mensagemErro = "";
      this.formRegisto.reset();
    },
    error: (err) => {
  console.log("ERRO DO BACKEND:", err);
  this.mensagemErro = err.error?.msg || "Erro no registo.";
  this.mensagemSucesso = "";
}

  });
  }
}

