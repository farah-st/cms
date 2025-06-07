import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact | null = null;
  editedContact: Contact = new Contact('', '', '', '', '', null);
  originalContact: Contact | null = null;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.contact = this.contactService.getContact(id);
      this.originalContact = this.contact;

      if (this.contact) {
        this.editedContact = new Contact(
          this.contact.id,
          this.contact.name,
          this.contact.email,
          this.contact.phone,
          this.contact.imageUrl,
          this.contact.group
        );
        this.editMode = true;
      }
    }
  }

  onSubmit(): void {
    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, this.editedContact);
    } else {
      this.contactService.addContact(this.editedContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
  this.router.navigate(['/contacts']);
}

}

