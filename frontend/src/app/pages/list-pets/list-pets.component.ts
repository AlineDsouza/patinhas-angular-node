import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../models/Pet';
import { PetService } from '../../services/pet.service';
import { OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'app-list-pets',
  imports: [CommonModule,ReactiveFormsModule, FormsModule,HeaderComponent],
  templateUrl: './list-pets.component.html',
  styleUrl: './list-pets.component.css'
})
export class ListPetsComponent implements OnInit {
pets: Pet[] = [];
petsFiltrados: Pet[] = [];

filtroEspecie: string = '';
filtroCidade: string = '';

  //cidades fixas para o filtro
  cidadesDisponiveis: string[] = ['Vila Nova de Gaia', 'Porto', 'Outros'];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    // Obtém a lista de pets ao iniciar
    this.petService.getPets().subscribe({
      next: pets => {
        this.pets = pets;
        this.petsFiltrados = pets; // mostra todos ao carregar
      },
      error: err => console.error('Erro ao carregar pets', err)
    });
  }

  aplicarFiltro(): void {
    this.petsFiltrados = this.pets.filter(pet => {
      const especieOk = this.filtroEspecie ? pet.especie === this.filtroEspecie : true;

      //Verifica cidade: Vila Nova de Gaia, Porto ou Outros
      const cidadeOk =
        this.filtroCidade === '' ||
        this.filtroCidade === pet.cidade ||
        (this.filtroCidade === 'Outros' && pet.cidade !== 'Porto' && pet.cidade !== 'Vila Nova de Gaia');

      return especieOk && cidadeOk;
    });
  }


  verDetalhe(id: string): void {
    this.router.navigate(['/detalhes', id]);
  }

}
