import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/Pet';
import { PetService } from '../../services/pet.service'; 
import { AdocaoService } from '../../services/adocao.service';
import { AdocaoForm } from '../../models/adocao-form';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-admin',
  imports: [NgFor,NgIf,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
pets: Pet[] = [];
formularios: AdocaoForm[] = [];
nome: string | null = '';
email: string | null = '';

  constructor(
    private petService: PetService,
    private adocaoService: AdocaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('nome');
    this.email = localStorage.getItem('email');

    this.petService.getPets().subscribe({
      next: (dados) => this.pets = dados
    });

    this.adocaoService.buscarTodosFormularios().subscribe({
      next: (dados) => this.formularios = dados
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  irParaCrud(): void {
    this.router.navigate(['/crud-pets']);
  }
}

