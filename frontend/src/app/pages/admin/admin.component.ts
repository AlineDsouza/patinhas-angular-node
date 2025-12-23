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
 const logo = new Image();
 logo.src = '/logo.png'; // imagem vinda da pasta public

  // Cor principal do projeto
  const corPrimaria = '#ff6f61';

   /* ================= LOGO ================= */
    doc.addImage(logo, 'PNG', 20, 10, 25, 25);
    // (imagem, tipo,tamanhos)

  /* ================= TÍTULO ================= */
  doc.setTextColor(corPrimaria);
  doc.setFontSize(18);
  doc.text('Formulário de Adoção', 60, 25);

  // Linha separadora
  doc.setDrawColor(200);
  doc.line(20, 35, 190, 35);

  /* ================= DADOS DO ADOTANTE ================= */
  doc.setTextColor(0);
  doc.setFontSize(12);

  
  doc.text('Nome do adotante:', 20, 45);
  doc.text(formulario.nomeAdotante, 80, 45);

  doc.text('Email:', 20, 55);
  doc.text(formulario.emailAdotante, 80, 55);

  doc.text('Telefone:', 20, 65);
  doc.text(formulario.telefone, 80, 65);

  /* ================= ROTINA ================= */
  doc.text('Rotina do Pet:', 20, 85);
  doc.text(formulario.rotinaPet, 20, 95, { maxWidth: 170 });

  /* ================= EXPERIÊNCIA ================= */
  doc.text('Experiência Anterior com Animais:', 20, 120);
  doc.text(formulario.experienciaAnterior, 20, 130, { maxWidth: 170 });

  /* ================= DISPONIBILIDADE ================= */
  doc.text(
    `Disponibilidade: ${formulario.disponibilidade || 'Não informado'}`,
    20,
    155
  );

  /* ================= JUSTIFICATIVA ================= */
  doc.text('Justificativa para adoção:', 20, 170);
  doc.text(
    formulario.justificativa || 'Não informado',
    20,
    180,
    { maxWidth: 170 }
  );

  /* ================= RODAPÉ ================= */
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    'Patinhas - Plataforma de Adoção',
    20,
    290
  );
  doc.save(`formulario-adocao-${formulario.nomeAdotante}.pdf`);
}
}