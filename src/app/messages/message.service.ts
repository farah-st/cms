import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  private messages: Message[] = [];
  private maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

 getMessages(): void {
  this.http.get<Message[]>('https://cms-project-2025-default-rtdb.firebaseio.com/messages.json')
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      error: (error: any) => {
        console.error('Error fetching messages:', error);
      }
    });
  }

  private getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message): void {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);

    this.storeMessages();
  }

  storeMessages(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-project-2025-default-rtdb.firebaseio.com/messages.json',
      JSON.stringify(this.messages),
      { headers }
    ).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }
}
