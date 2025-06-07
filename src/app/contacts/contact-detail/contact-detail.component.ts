import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }

  onDelete(): void {
  if (this.contact) {
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }
}

onCancel(): void {
  this.router.navigate(['/contacts']);
}


}

