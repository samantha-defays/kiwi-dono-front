import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string = "Les messages de Kiwi dono";
  public message: string = "Hello world !";
  public messages: Message[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  public createMessage(): void {
    this.apiService.createMessage(this.message).subscribe((res: Message) => {
      this.messages.push(res);
    })
  }

  public getMessages(): void {
    this.apiService.getMessages().subscribe((res: Message[]) => {
      this.messages = res;
    });
  }

  public updateMessage(id: number, messageText: string): void {
    this.apiService.updateMessage(+id, messageText).subscribe((res: Message) => {
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
