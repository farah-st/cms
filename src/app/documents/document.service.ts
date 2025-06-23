import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number = 0;

  constructor(private http: HttpClient) { }

  getDocuments() {
    this.http.get<Document[]>('https://cms-project-2025-default-rtdb.firebaseio.com/documents.json')
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        error: (error: any) => {
          console.error('Error fetching documents:', error);
        }
      });
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  private getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (!isNaN(currentId) && currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  storeDocuments() {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://cms-project-2025-default-rtdb.firebaseio.com/documents.json',
      JSON.stringify(this.documents),
      { headers }
    ).subscribe({
      next: () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    });
  }
}

