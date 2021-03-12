import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
   
  id: string;
  client: Client;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];
     this.clientService.getClient(this.id).subscribe(client => {
         this.client = client;
         console.log(this.client);
     })
  }

}
