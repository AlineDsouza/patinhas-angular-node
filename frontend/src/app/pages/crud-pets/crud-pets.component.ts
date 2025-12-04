import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service.js';
import { Pet } from '../../models/Pet.js';

@Component({
  selector: 'app-crud-pets',
  imports: [ReactiveFormsModule,NgIf, CommonModule],
  templateUrl: './crud-pets.component.html',
  styleUrl: './crud-pets.component.css'
})
export class CrudPetsComponent implements OnInit {


  



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


mensagemSucesso: string = '';
mensagemErro: string = '';

selectedFile: File | null = null;
previewImagem: string | null = null;

  constructor(private petService: PetService) {}

exibirMensagemSucesso(msg: string) {
  this.mensagemSucesso = msg;
  this.mensagemErro = '';
  setTimeout(() => this.mensagemSucesso = '', 3000);
}

exibirMensagemErro(msg: string) {
  this.mensagemErro = msg;
  this.mensagemSucesso = '';
  setTimeout(() => this.mensagemErro = '', 3000);
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];

  const reader = new FileReader();
  reader.onload = e => this.previewImagem = reader.result as string;
  reader.readAsDataURL(this.selectedFile);
}






  ngOnInit(): void {
    this.listarPets();
  }

  // GET – carrega da API
  listarPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.VetorPet = pets;
    });
  }

  // POST – cria no backend
 cadastrar(): void {
  const formData = new FormData();

  Object.entries(this.formCrudPets.value).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.petService.createPet(formData).subscribe({
    next: () => {
      this.listarPets();
      this.formCrudPets.reset();
      this.selectedFile = null;
      this.previewImagem = null;
      this.btnCadastrar = true;
      this.exibirMensagemSucesso("Pet cadastrado com sucesso!");
    },
    error: () => this.exibirMensagemErro("Erro ao cadastrar o pet!")
  });
}


  selecionar(indice: number): void {
    this.indice = indice;
    this.btnCadastrar = false;

    this.formCrudPets.setValue({
      nome: this.VetorPet[indice].nome,
      idade: this.VetorPet[indice].idade,
      cidade: this.VetorPet[indice].cidade,
      descricao: this.VetorPet[indice].descricao,
      peso: this.VetorPet[indice].peso,
      vacinado: this.VetorPet[indice].vacinado,
      castrado: this.VetorPet[indice].castrado,
      raca: this.VetorPet[indice].raca,
    });
  }

  // PUT – atualiza no backend
 editar(): void {
  if (this.indice === -1) return;

  const id = this.VetorPet[this.indice]._id!;
  const formData = new FormData();

  Object.entries(this.formCrudPets.value).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  this.petService.updatePet(id, formData).subscribe({
    next: () => {
      this.listarPets();
      this.formCrudPets.reset();
      this.btnCadastrar = true;
      this.selectedFile = null;
      this.previewImagem = null;
      this.indice = -1;
      this.exibirMensagemSucesso("Pet atualizado com sucesso!");
    },
    error: () => this.exibirMensagemErro("Erro ao atualizar o pet!")
  });
}


  // DELETE – remove no backend
  deletar(): void {
    const id = this.VetorPet[this.indice]._id!;

    this.petService.deletePet(id).subscribe(() => {
      this.listarPets();
      this.formCrudPets.reset();
      this.btnCadastrar = true;
    });
  }

  cancelar(): void {
    this.formCrudPets.reset();
    this.btnCadastrar = true;
  }}