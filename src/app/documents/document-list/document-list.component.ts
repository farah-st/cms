import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    {
      id: '1',
      name: 'Document 1',
      description: 'This is the first document',
      url: 'http://example.com/doc1',
      children: []
    },
    {
      id: '2',
      name: 'Document 2',
      description: 'Second document goes here',
      url: 'http://example.com/doc2',
      children: []
    }
  ];

  onDocumentSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}