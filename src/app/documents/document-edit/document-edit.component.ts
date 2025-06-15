import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

      const fetchedDocument = this.documentService.getDocument(this.id);
      if (!fetchedDocument) return;

      this.editMode = true;
      this.originalDocument = fetchedDocument;
      this.editedDocument = JSON.parse(JSON.stringify(fetchedDocument)); // Deep copy
    });
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const value = form.value;
    const newDocument = new Document(
      this.editedDocument.id,
      value.name,
      value.description,
      value.url,
      []
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel(): void {
    this.router.navigate(['/documents']);
  }
}
