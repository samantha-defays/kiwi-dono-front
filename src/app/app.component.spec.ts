import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Message } from './message';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let mockMessages: Message[];

  beforeEach(async () => {
    mockMessages = [
      { id: 1, text: 'Message 1' },
      { id: 2, text: 'Message 2' }
    ];

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [ApiService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    // Simuler les appels du service API
    spyOn(apiService, 'getMessages').and.returnValue(of(mockMessages));
    spyOn(apiService, 'createMessage').and.returnValue(of({ id: 3, text: 'New Message' }));
    spyOn(apiService, 'updateMessage').and.returnValue(of({ id: 1, text: 'Updated Message' }));
    spyOn(apiService, 'deleteMessage').and.returnValue(of(1));

    fixture.detectChanges();
  });

  it('application créée', () => {
    expect(component).toBeTruthy();
  });

  it(`devrait avoir pour titre 'kiwi-dono-fron'`, () => {
    expect(component.title).toEqual('kiwi-dono-fron');
  });

  it('doit appeler getMessages et remplit la variable messages', () => {
    component.getMessages();
    expect(apiService.getMessages).toHaveBeenCalled();
    expect(component.messages.length).toBe(2);
    expect(component.messages).toEqual(mockMessages);
  });

  // Test pour createMessage
  it('doit appeler createMessage et ajoute un nouveau message à la liste', () => {
    component.message = 'New Message';
    component.createMessage();
    expect(apiService.createMessage).toHaveBeenCalled();
    expect(component.messages.length).toBe(3);
    expect(component.messages[2].text).toBe('New Message');
  });

  // Test pour updateMessage
  it('doit appeler updateMessage et logguer updated message', () => {
    const consoleSpy = spyOn(console, 'log');
    component.updateMessage(1, 'Updated Message');
    expect(apiService.updateMessage).toHaveBeenCalledWith(1, { id: 1, text: 'Updated Message' });
    expect(consoleSpy).toHaveBeenCalledWith({ id: 1, text: 'Updated Message' });
  });

  // Test pour deleteMessage
  it('doit appeler deleteMessage et retirer le message de la liste', () => {
    component.deleteMessage(1);
    expect(apiService.deleteMessage).toHaveBeenCalledWith(1);
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].id).toBe(2);
  });
});
