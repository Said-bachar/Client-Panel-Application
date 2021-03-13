import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0
  };
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.clientService.getClient(this.id).subscribe(client => {
         this.client = client;
         console.log(this.client);
     })
  }

  onSubmit() {
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Client updated successfully.',  {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']); // '/' or: '/client/', this.id
  }

}
