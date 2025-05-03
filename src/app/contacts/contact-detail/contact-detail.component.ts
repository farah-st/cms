import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact = new Contact(
    '1',
    'R. Kent Jackson',
    'jacksonk@byui.edu',
    '208-496-3771',
    'assets/jacksonk.jpg',
    []
  );
}

