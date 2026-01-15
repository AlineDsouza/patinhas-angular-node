import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdocaoForm } from '../models/adocao-form';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {
// URL da API responsável pelas operações de adoção
  private apiUrl = 'http://localhost:3000/api/adocao';
// Injeta o HttpClient para permitir comunicação com o backend via HTTP
  constructor(private http: HttpClient) {}

  // Envia os dados do formulário de adoção para o backend
  // Utiliza o método POST para criar um novo registo de adoção
  // Retorna um Observable com a resposta da API
   enviarFormulario(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/formulario-adocao`, dados);
  }
  
// Obtém todos os formulários de adoção registados no sistema
// Utiliza o método GET para consultar os dados no backend
// Retorna um Observable com a lista de formulários
  buscarTodosFormularios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formularios`);
  }

}