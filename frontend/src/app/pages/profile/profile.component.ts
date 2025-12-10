import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, RouterLink, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  nome: string | null = '';
  email: string | null = '';
  role: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nome = localStorage.getItem('nome');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
