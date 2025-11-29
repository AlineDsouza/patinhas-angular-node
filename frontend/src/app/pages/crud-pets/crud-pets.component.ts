import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../models/Pet';

@Component({
  selector: 'app-crud-pets',
  imports: [ReactiveFormsModule,NgIf, CommonModule],
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
  VetorPet: Pet[] = [];

  //Armazenar indice do pet selecionado
  indice:number = -1; //garante que nenhum pet está selecionado inicialmente




  //Função de cadastro
cadastrar() {
      //Cadastro no vetor
      this.VetorPet.push(this.formCrudPets.value as Pet);
      //Limpeza dos inputs
      this.formCrudPets.reset();
      //Visualização no console
     // console.table(this.VetorPet);  // TESTE 
    }

//Função de Selecção
selecionar(indice: number) {
  //atribuir o indice do pet selecionado
  this.indice = indice;
  //preencher o formulário com os dados do pet selecionado
  this.formCrudPets.setValue({
    nome: this.VetorPet[indice].nome,
    idade: this.VetorPet[indice].idade,
    cidade: this.VetorPet[indice].cidade,
    descricao: this.VetorPet[indice].descricao,
    peso: this.VetorPet[indice].peso,
    vacinado: this.VetorPet[indice].vacinado,
    castrado: this.VetorPet[indice].castrado,
    raca: this.VetorPet[indice].raca,
    // imageUrl: this.VetorPet[indice].imageUrl,
    // imageId: this.VetorPet[indice].imageId
  });
  //Visibilidade dos botões
  this.btnCadastrar = false;
}

//Função de editar
editar() {
   //aletrar vetor do indice selecionado
   this.VetorPet[this.indice] = this.formCrudPets.value as Pet;
    //limpeza dos inputs
    this.formCrudPets.reset();
    //alterar visibilidade dos botões
    this.btnCadastrar = true;
}

//Função de deletar
deletar() {
  // deletar o pet selecionado do vetor
  this.VetorPet.splice(this.indice,1);
  //limpar os inputs
  this.formCrudPets.reset();
  //alterar visibilidade dos botões
  this.btnCadastrar = true;
}

//Função de cancelamento
  cancelar() {
    //limpar os inputs
    this.formCrudPets.reset();
    //alterar visibilidade dos botões
    this.btnCadastrar = true;
  
  }
}

