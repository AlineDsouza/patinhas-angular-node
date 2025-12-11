import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdocaoService } from '../../services/adocao.service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, RouterLink, NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  nome: string | null = '';
  email: string | null = '';
  role: string | null = '';
  formulariosDoUtilizador: any[] = [];

  constructor(private router: Router, private adocaoService: AdocaoService) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('nome');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');

    if (this.role === 'user' && this.email) {
      this.adocaoService.buscarTodosFormularios().subscribe({
      next: (formularios) =>
      this.formulariosDoUtilizador = formularios.filter(f => f.emailAdotante === this.email),
      error: console.error
});
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
