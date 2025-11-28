import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { UserCredentialsRequest } from '../models/user-credentials-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials:UserCredentialsRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>('http://localhost:3000/auth/login', credentials); 
  }

}
