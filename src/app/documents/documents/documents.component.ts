import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DocumentListComponent } from '../document-list/document-list.component'; // ✅ Adjust path if needed
import { DocumentDetailComponent } from '../document-detail/document-detail.component'; // ✅ Adjust path if needed

@Component({
  selector: 'cms-documents',
  standalone: true, 
  imports: [
    CommonModule, 
    DocumentListComponent,
    DocumentDetailComponent
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'] 
})
export class DocumentsComponent {

  
}

