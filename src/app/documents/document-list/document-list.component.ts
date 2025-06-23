import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  standalone: true,
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  imports: [CommonModule, RouterModule, DocumentItemComponent]
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private docSubscription!: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.docSubscription = this.documentService.documentListChangedEvent.subscribe(
    (documents: Document[]) => {
      this.documents = documents;
    }
  );

    this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.docSubscription?.unsubscribe();
  }
}

