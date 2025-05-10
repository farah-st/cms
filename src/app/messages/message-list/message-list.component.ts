import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Hello', 'Hi there!', 'Alice'),
    new Message('2', 'Update', 'Project is done.', 'Bob'),
    new Message('3', 'FYI', 'Meeting postponed.', 'Charlie')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}


