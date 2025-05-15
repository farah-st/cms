import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageListComponent } from '../message-list/message-list.component';
@Component({
  selector: 'cms-messages',
  standalone: true,
  imports: [
    CommonModule,
    MessageListComponent
  ],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: Message[] = [];

  onAddMessage(newMessage: Message) {
  this.messages.push(newMessage);
  }
}
