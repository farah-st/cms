import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  contact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contact = this.contactService.getContact(this.message.sender) ?? null;
  }
}
