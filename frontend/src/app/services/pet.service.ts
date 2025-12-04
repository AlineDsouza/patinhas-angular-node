import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/Pet';

@Injectable({
  providedIn: 'root' // torna o service disponível em toda a aplicação
})
export class PetService {

  private apiUrl = 'http://localhost:3000/api/pets'; // endereço da API no backend

  constructor(private http: HttpClient) {} 

   // GET - Buscar todos os pets
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }
  
// POST - Criar um novo pet
createPet(dados: any): Observable<Pet> {
  return this.http.post<Pet>(this.apiUrl, dados);// aqui eu simplesmente mando o objeto JSON
 
}

  // PUT - Atualizar um pet existente
updatePet(id: string, dados: any): Observable<Pet> {
  return this.http.put<Pet>(`${this.apiUrl}/${id}`, dados);
}

  // DELETE - Remover um pet pelo id
  deletePet(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
