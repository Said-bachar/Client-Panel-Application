import { AuthClientService } from './../../services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  clients: Client[];
  total: number = 0;
  searchClients: Client[];
  constructor(
     private clientService: ClientService,
     private authClientService: AuthClientService,
     private router: Router,
     private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.authClientService.getAuth().subscribe(auth => {
      this.clientService.getClients(auth.uid).subscribe(clients => {
        this.searchClients = this.clients = clients;
        this.total = this.getTotal();
     })
    });
     
  }

  getTotal() {
    return this.clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
    }, 0);
  }

  deleteClient(id: string) {
    
    Swal.fire({
      title: 'Are you sure to delete this client?',
      text: 'You will not be able to recover it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.flashMessage.show('Client deleted successfully.',  {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/']);

        Swal.fire({
          title: 'Deleted',
          text: 'This client is deleted!',
          icon: 'success',
          timer: 2000 
        })
      
      } 
    })  
  }

  search(query: string) {
     this.searchClients = (query) ? this.clients.filter(client => 
      client.firstName.toLowerCase().includes(query.toLowerCase()) || 
      client.lastName.toLowerCase().includes(query.toLowerCase()) || 
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.phone.toString().includes(query)) : this.clients;
  }

}
