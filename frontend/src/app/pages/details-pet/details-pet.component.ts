import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/Pet';
import { OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';



@Component({
  selector: 'app-details-pet',
  imports: [RouterLink, CommonModule,HeaderComponent],
  templateUrl: './details-pet.component.html',
  styleUrl: './details-pet.component.css'
})
export class DetailsPetComponent implements OnInit {
 pet: Pet | null = null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petService.recebePetId(id).subscribe({
        next: (resposta) => {
          this.pet = resposta;
        },
        error: (erro) => {
          console.error("Erro ao carregar pet:", erro);
        }
      });
    }
  }
}