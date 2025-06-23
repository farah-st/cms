import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {

    this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }
}