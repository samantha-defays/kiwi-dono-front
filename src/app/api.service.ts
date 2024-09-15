import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // Adresse de ton backend
  private headers: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  // Obtenir tous les messages
  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`);
  }

  // Obtenir un message par ID
  getMessage(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${id}`);
  }

  // Créer un nouveau message
  createMessage(message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/messages`, {text: message});
  }

  // Mettre à jour un message par ID
  updateMessage(id: number, messageText: string): Observable<Message> {
    return this.http.put(`${this.apiUrl}/messages/${id}`, {text: messageText});
  }

  // Supprimer un message par ID
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/messages/${id}`);
  }
}
