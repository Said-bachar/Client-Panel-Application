import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: 0
  }
  constructor( private clientService: ClientService, private router: Router, private flashMessages: FlashMessagesService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
     this.clientService.newClient(this.client);
     this.flashMessages.show('Client addes successfully.', {cssClass: 'alert-primary', timeout: 3000});
     return this.router.navigate(['/']);
  }

}
