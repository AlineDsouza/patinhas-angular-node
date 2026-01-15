import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// URL da API responsável pelas operações de adoção
  private apiUrl = 'http://localhost:3000/auth';

// Injeta o HttpClient para permitir comunicação HTTP com o backend
  constructor(private http: HttpClient) {}
  
 /*  REGISTO  */
// Envia os dados de registo do utilizador para o backend
// Utiliza o método POST para criar um novo utilizador
  registrar(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registo`, dados);
  }
 /*  LOGIN  */
// Envia as credenciais de login para o backend
  async login(dados: any) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/login`, dados)
    );
  }
}
