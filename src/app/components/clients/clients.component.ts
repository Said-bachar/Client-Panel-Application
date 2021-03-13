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
  constructor(private clientService: ClientService) { }

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

}
