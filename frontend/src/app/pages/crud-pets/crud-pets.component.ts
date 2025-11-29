import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-pets',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './crud-pets.component.html',
  styleUrl: './crud-pets.component.css'
})
export class CrudPetsComponent {

  //Objeto FormGroup para gerenciar o formulário
 formCrudPets = new FormGroup({
  nome: new FormControl('',[ Validators.required, Validators.minLength(3)]),
  idade: new FormControl(null,[Validators.required,Validators.min(0), Validators.max(30)]),
  cidade: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]),
  descricao: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(600)]),
  peso: new FormControl(null,[Validators.required,]),
  vacinado: new FormControl(false, [Validators.required]),
  castrado: new FormControl(false, [Validators.required]),
  raca: new FormControl('',[Validators.required]),
  // imageUrl: new FormControl('',[Validators.required]),
  // imageId: new FormControl('',[Validators.required])
  });

  //Visibilidade dos botões
  btnCadastrar:boolean = true;

  //Vetor para armazenar os pets cadastrados






  cadastrar() {
    console.log("Cadastrado:", this.formCrudPets.value);
  }

  editar() {
    console.log("Editar:", this.formCrudPets.value);
  }

  deletar() {
    console.log("Deletar:", this.formCrudPets.value);
  }

  cancelar() {
    this.formCrudPets.reset();
  }
}

