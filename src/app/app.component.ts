import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { DocumentsComponent } from './documents/documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    ContactsComponent,
    DocumentsComponent,
    MessageListComponent
  ]
})
export class AppComponent {
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}


