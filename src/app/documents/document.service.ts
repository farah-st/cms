import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new EventEmitter<Document[]>(); // <- Add this

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  deleteDocument(id: string): void {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index > -1) {
      this.documents.splice(index, 1);
      this.documentListChangedEvent.emit(this.getDocuments()); // <- Notify changes
    }
  }
}
