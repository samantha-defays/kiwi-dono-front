import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Message } from './message';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController); 
  });

  // Nettoyage après chaque test
  afterEach(() => {
    httpMock.verify(); 
  });

  // Vérification que le service est bien créé
  it('devrait être créé', () => {
    expect(service).toBeTruthy(); 
  });

  // Test de la méthode GET
  it('devrait récupérer les messages via GET', () => {
    const dummyMessages: Message[] = [
      { id: 1, text: 'Message 1' },
      { id: 2, text: 'Message 2' }
    ];

    service.getMessages().subscribe(messages => {
      expect(messages.length).toBe(2);
      expect(messages).toEqual(dummyMessages);
    });

    // Simule la requête GET
    const req = httpMock.expectOne(`${service.apiUrl}/messages`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMessages);
  });

  // Test de la méthode POST
  it('devrait envoyer un nouveau message via POST', () => {
    const newMessage: Message = {text: 'Nouveau message'} ;

    service.createMessage(newMessage).subscribe(response => {
      expect(response).toEqual(newMessage);
    });

    // Simule la requête POST
    const req = httpMock.expectOne(`${service.apiUrl}/messages`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMessage);
    req.flush(newMessage);
  });

  // Test de la méthode PUT
  it('devrait mettre à jour un message via PUT', () => {
    const updatedMessage: Message = {text: 'Updated Message'} ;

    service.updateMessage(1, updatedMessage).subscribe(response => {
      expect(response).toEqual(updatedMessage);
    });

    // Simule la requête PUT
    const req = httpMock.expectOne(`${service.apiUrl}/messages/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMessage);
  });

  // Test de la méthode DELETE
  it('devrait supprimer un message via DELETE', () => {
    service.deleteMessage(1).subscribe(response => {
      expect(response).toEqual({});
    });

    // Simule la requête DELETE
    const req = httpMock.expectOne(`${service.apiUrl}/messages/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); 
  });
});
