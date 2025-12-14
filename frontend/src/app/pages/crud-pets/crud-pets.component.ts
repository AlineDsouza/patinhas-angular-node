import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/Pet';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-crud-pets',
  imports: [ReactiveFormsModule,NgIf, CommonModule, RouterLink,HeaderComponent],
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
  especie: new FormControl('', [Validators.required])
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
  //  objeto JSON com os dados do form
  const dados = {
    ...this.formCrudPets.value,
    image: this.previewImagem   // a imagem convertida para base64
  };

  this.petService.createPet(dados).subscribe({
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

  const petSelecionado = this.VetorPet[indice];

  // Preenche o formulário com os dados do pet
  this.formCrudPets.setValue({
    nome: petSelecionado.nome,
    idade: petSelecionado.idade,
    cidade: petSelecionado.cidade,
    descricao: petSelecionado.descricao,
    peso: petSelecionado.peso,
    vacinado: petSelecionado.vacinado,
    castrado: petSelecionado.castrado,
    raca: petSelecionado.raca,
    especie: petSelecionado.especie
  });

  // Mostra a imagem do pet na tela quando clicar em selecionar
  this.previewImagem = petSelecionado.imageUrl || null;

  // Impede que uma imagem antiga seja reenviada
  this.selectedFile = null;
}

  // PUT – atualiza no backend
 editar(): void {
  if (this.indice === -1) {
    this.exibirMensagemErro("Selecione um pet antes de editar!");
    return;
  }
 // pega o _id do pet selecionado
  const id = this.VetorPet[this.indice]._id!;

  // JSON com os dados do formulário
  // e também envia a imagem em (se existir)
  const dados = {
    ...this.formCrudPets.value,
    image: this.previewImagem  
  };
  

  this.petService.updatePet(id, dados).subscribe({
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
  this.previewImagem = null;
  this.selectedFile = null;
  this.indice = -1;
  }} 