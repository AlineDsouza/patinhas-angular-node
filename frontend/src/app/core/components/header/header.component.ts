import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //Faz com que eu possa referenciar as rotas definidas no app.routes.ts

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  utilizadorNome: string | null = null;
  utilizadorRole: string | null = null;

 
  constructor() {
    const nome = localStorage.getItem('nome');
    const role = localStorage.getItem('role');

    if (nome && nome !== 'undefined') {
      this.utilizadorNome = nome;
      this.utilizadorRole = role;
    }
  }

}