import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts/contact.model'; 

@Pipe({
  name: 'contactsFilter',
  standalone: true // Needed if you're using standalone components and pipes
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term.trim() === '') return contacts;

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );

    return filtered.length > 0 ? filtered : contacts;
  }
}

