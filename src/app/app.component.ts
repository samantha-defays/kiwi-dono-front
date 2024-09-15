import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string = "kiwi-dono-fron";
  public pageTitle: string = "Les messages de Kiwi dono";
  public message: string = "Hello world !";
  public messages: Message[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  public createMessage(): void {
    const message = {text: this.message};
    this.apiService.createMessage(message).subscribe((res: Message) => {
      this.messages.push(res);
    })
  }

  public getMessages(): void {
    this.apiService.getMessages().subscribe((res: Message[]) => {
      this.messages = res;
    });
  }

  public updateMessage(id: number, messageText: string): void {
    const message = {id: id, text: messageText};
    this.apiService.updateMessage(+id, message).subscribe((res: Message) => {
      console.log(res);
      
    })
  }

  public deleteMessage(id: Number): void {
    this.apiService.deleteMessage(+id).subscribe((res: number) => {
      const messageIndex = this.messages.findIndex((message: Message) => message.id == res);
      if(messageIndex != -1) this.messages.splice(messageIndex, 1);
    })
  }
}
