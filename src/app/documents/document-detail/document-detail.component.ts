import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service'; 

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document!: Document | undefined;
  nativeWindow: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.document = this.documentService.getDocument(id);
      }
    });
  }

  onView() {
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']);
    }
  }
}
