import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  imports: [CommonModule, RouterModule]
})

export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id) ?? null;
    });
  }

    onDelete(): void {
    console.log('Delete clicked'); 
  }

}


