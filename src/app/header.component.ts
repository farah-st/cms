import { Component } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [DropdownDirective, RouterModule]
})
export class HeaderComponent {}



