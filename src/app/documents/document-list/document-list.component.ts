import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { DocumentService } from '../document.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [CommonModule, DocumentItemComponent, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentListChangedEvent.subscribe(
      (docs: Document[]) => {
        this.documents = docs;
      }
    );
  }
}