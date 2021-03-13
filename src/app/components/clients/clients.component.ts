import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  clients: Client[];
  total: number = 0;
  constructor(
     private clientService: ClientService,
     private router: Router,
     private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
     this.clientService.getClients().subscribe(clients => {
       this.clients = clients;
       console.log(clients);
       this.total = this.getTotal();
    });
  }

  getTotal() {
    return this.clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
    }, 0);
  }

  deleteClient(id: string) {
    if(confirm('Are sure to delete this client?')) {
      this.clientService.deleteClient(id);
      this.flashMessage.show('Client deleted successfully.',  {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/']);
     }
    
  }

}
