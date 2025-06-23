import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  private maxContactId: number = 0;

  constructor(private http: HttpClient) {}

  getContacts(): Contact[] {
    this.http.get<Contact[]>('https://cms-project-2025-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      });

    return this.contacts;
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  private getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  storeContacts(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-project-2025-default-rtdb.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      { headers }
    ).subscribe({
      next: () => {
        this.contactChangedEvent.next(this.contacts.slice());
      }
    });
  }
}