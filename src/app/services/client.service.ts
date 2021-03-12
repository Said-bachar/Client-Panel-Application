import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientsDocument: AngularFirestoreDocument<Client>

  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients');
  }

  getClients(): Observable<Client []> {
    return this.clientsCollection.snapshotChanges().pipe(map((actions: any) => {
     return actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
     });
  }));
}

newClient(client: Client) {
  this.clientsCollection.add(client);
}

}
