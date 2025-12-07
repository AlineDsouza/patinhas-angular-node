import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdocaoForm } from '../models/adocao-form';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {
  private apiUrl = 'http://localhost:3000/api/adocao';

  constructor(private http: HttpClient) {}

   enviarFormulario(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/formulario-adocao`, dados);
  }
}