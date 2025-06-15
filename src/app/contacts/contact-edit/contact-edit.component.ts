import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  standalone: true,
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  imports: [CommonModule, FormsModule, DragDropModule, ContactItemComponent]
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  editedContact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const contact = this.contactService.getContact(id);
      if (contact) {
        this.editMode = true;
        this.originalContact = contact;
        this.editedContact = JSON.parse(JSON.stringify(contact)); // Deep copy
        this.groupContacts = this.editedContact.group ? [...this.editedContact.group] : [];
      }
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    this.editedContact.group = [...this.groupContacts];

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

  onRemoveItem(index: number): void {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
    console.log('📦 DROP EVENT:', event);
    moveItemInArray(this.groupContacts, event.previousIndex, event.currentIndex);
  }

}
