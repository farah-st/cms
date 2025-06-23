import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Document } from '../document.model';

@Component({
  standalone: true,
  selector: 'cms-document-item',
  imports: [CommonModule, RouterModule], 
  template: `
    <a class="list-group-item clearfix documentDiv" [routerLink]="[document.id]">
      <p class="pull-left">{{ document.name }}</p>
    </a>
  `
})
export class DocumentItemComponent {
  @Input() document!: Document;
}
