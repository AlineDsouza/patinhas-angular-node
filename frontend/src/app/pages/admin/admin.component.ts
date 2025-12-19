import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/Pet';
import { PetService } from '../../services/pet.service'; 
import { AdocaoService } from '../../services/adocao.service';
import { AdocaoForm } from '../../models/adocao-form';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import jsPDF from 'jspdf';


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

//Baixar pdf do formulário

baixarPdf(formulario: AdocaoForm): void {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Formulário de Adoção', 20, 20);

  doc.setFontSize(12);

  doc.text(`Nome do adotante: ${formulario.nomeAdotante}`, 20, 40);
  doc.text(`Email: ${formulario.emailAdotante}`, 20, 50);
  doc.text(`Telefone: ${formulario.telefone}`, 20, 60);

  doc.text('Rotina do Pet:', 20, 80);
  doc.text(formulario.rotinaPet, 20, 90, { maxWidth: 170 });

  doc.text('Experiência Anterior com Animais:', 20, 120);
  doc.text(formulario.experienciaAnterior, 20, 130, { maxWidth: 170 });

  doc.text(
    `Disponibilidade: ${formulario.disponibilidade}`,
    20,
    160
  );

  doc.text('Justificativa para adoção:', 20, 180);
  doc.text(
    formulario.justificativa,
    20,
    190,
    { maxWidth: 170 }
  );

  doc.save(`formulario-adocao-${formulario.nomeAdotante}.pdf`);
}


}