import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
   
  id: string;
  client: Client;
  showBalance: boolean = false;

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
    this.flashMessage.show('Balance updated successfully.',  {cssClass: 'alert-warning', timeout: 3000});
    this.showBalance = false;
  }

  deleteClient(id: string) {
    if(confirm('Are sure to delete this client?')) {
      this.clientService.deleteClient(id);
      this.flashMessage.show('Client deleted successfully.',  {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/']);
     }
    
  }

}
