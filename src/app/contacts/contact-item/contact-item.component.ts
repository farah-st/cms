import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent {
  @Input() contact!: Contact;
}
