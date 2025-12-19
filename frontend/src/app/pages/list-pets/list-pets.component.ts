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
pets: Pet[] = []; // lista com todos os pets vindos do backend
petsFiltrados: Pet[] = [];  // lista após aplicar os filtros (espécie e cidade)
petsPaginados: Pet[] = []; // pets que aparecem na página atual

filtroEspecie: string = '';
filtroCidade: string = '';

// PAGINAÇÃO
  paginaAtual: number = 1; //guarda a página atual
  itensPorPagina: number = 9; // quantidade de pets mostrados por página

  //cidades fixas para o filtro
  cidadesDisponiveis: string[] = ['Vila Nova de Gaia', 'Porto', 'Outros'];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    // Obtém a lista de pets ao iniciar
    this.petService.getPets().subscribe({
      next: pets => {
        this.pets = pets;
        this.petsFiltrados = pets; // mostra todos ao carregar
        this.atualizarPaginacao(); 
        // aplica a paginação logo ao carregar
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

    this.paginaAtual = 1; 
    // sempre volta para a primeira página ao aplicar filtro

    this.atualizarPaginacao(); 
    // atualiza a paginação depois do filtro

  }

    atualizarPaginacao(): void {
    // calcula o índice inicial com base na página atual
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

    // calcula o índice final
    const fim = inicio + this.itensPorPagina;

    // corta o array para mostrar apenas os pets da página atual
    this.petsPaginados = this.petsFiltrados.slice(inicio, fim);
  }

 proximaPagina(): void {
    // vai para a próxima página se não for a última
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }

  paginaAnterior(): void {
    // volta para a página anterior se não for a primeira
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  get totalPaginas(): number {
    // calcula quantas páginas existem no total
    return Math.ceil(this.petsFiltrados.length / this.itensPorPagina);
  }

  verDetalhe(id: string): void {
    this.router.navigate(['/detalhes', id]);
  } // navega para a página de detalhes do pet

}
