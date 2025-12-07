import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../models/Pet';
import { PetService } from '../../services/pet.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pets',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './list-pets.component.html',
  styleUrl: './list-pets.component.css'
})
export class ListPetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    // Obtém a lista de pets ao iniciar
    this.petService.getPets().subscribe({
      next: pets => this.pets = pets,
      error: err => console.error('Erro ao carregar pets', err)
    });
  }

verDetalhe(id: string): void {
  this.router.navigate(['/detalhes', id]);
}

}
