import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';
  


  constructor(private http: HttpClient) {}
 /*  REGISTO  */
  registrar(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registo`, dados);
  }
 /*  LOGIN  */
  async login(dados: any) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/login`, dados)
    );
  }
}
