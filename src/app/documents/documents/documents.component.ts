import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; // <-- Import RouterModule
import { Document } from '../document.model';
import { DocumentListComponent } from '../document-list/document-list.component'; // ✅ Adjust path if needed
// import { DocumentDetailComponent } from '../document-detail/document-detail.component'; // ✅ Adjust path if needed

@Component({
  selector: 'cms-documents',
  standalone: true, 
  imports: [
    CommonModule, 
    DocumentListComponent,
    // DocumentDetailComponent,
    RouterModule // <-- Add RouterModule here
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'] 
})
export class DocumentsComponent {
  selectedDocument!: Document;

  onDocumentSelected(document: Document) {
    this.selectedDocument = document;
  }
}