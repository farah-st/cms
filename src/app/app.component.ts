import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, ContactsComponent]
})
export class AppComponent {}
