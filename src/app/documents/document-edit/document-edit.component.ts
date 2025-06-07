import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  editMode = false;
  originalDocument!: Document;
  editedDocument!: Document;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        this.editedDocument = new Document('', '', '', '', []);
        return;
      }

      const document = this.documentService.getDocument(this.id);
      if (!document) return;

      this.editMode = true;
      this.originalDocument = document;
      this.editedDocument = JSON.parse(JSON.stringify(document)); // Deep copy
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, this.editedDocument);
    } else {
      this.documentService.addDocument(this.editedDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}


