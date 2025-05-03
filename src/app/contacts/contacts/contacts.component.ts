import { Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [ContactListComponent, ContactDetailComponent]
})
export class ContactsComponent {}
