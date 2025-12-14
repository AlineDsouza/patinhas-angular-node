import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup,FormControl, Validators } from '@angular/forms';
import { AdocaoService } from '../../services/adocao.service';
import { OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-adoption-form',
  imports: [CommonModule, ReactiveFormsModule,NgIf,HeaderComponent],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent implements OnInit {
  mensagemSucesso = '';
  mensagemErro = '';

  formAdocao = new FormGroup({
    nomeAdotante: new FormControl('', [Validators.required]),
    emailAdotante: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    rotinaPet: new FormControl('', [Validators.required]),
    experienciaAnterior: new FormControl('', [Validators.required]),
    disponibilidade: new FormControl(''),
    justificativa: new FormControl('')
  });

  constructor(private adocaoService: AdocaoService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.formAdocao.patchValue({ emailAdotante: email });
      this.formAdocao.get('emailAdotante')?.disable();
    }
  }

  enviar(): void {
    if (this.formAdocao.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      this.mensagemSucesso = '';
      return;
    }

    const dados = this.formAdocao.getRawValue(); // inclui campos desabilitados

    this.adocaoService.enviarFormulario(dados).subscribe({
      next: (res) => {
        this.mensagemSucesso = res.msg || 'Formulário enviado com sucesso!';
        this.mensagemErro = '';
        this.formAdocao.reset();
        this.ngOnInit(); //  email
      },
      error: (err) => {
        this.mensagemErro = err.error?.msg || 'Erro ao enviar o formulário.';
        this.mensagemSucesso = '';
      }
    });
  }
}