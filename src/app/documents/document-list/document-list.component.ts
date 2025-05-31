import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component'; // <-- ADD THIS BACK
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DocumentItemComponent], 
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  // onDocumentSelected(document: Document) {
  //   this.selectedDocumentEvent.emit(document);
  // }
}
