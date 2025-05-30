import { Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';

export const routes: Routes = [
  { path: 'documents', component: DocumentsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/documents', pathMatch: 'full' }
];


