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

  getClients(user: string): Observable<Client []> {
    return this.afs.collection('clients', ref => ref.where('user', '==', user)).snapshotChanges().pipe(map((actions: any) => {
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

getClient(id: string): Observable<Client> {
     return this.clientsCollection.doc(id).valueChanges();
}

updateClient(client: Client) {
  this.clientsDocument = this.clientsCollection.doc(client.id);
  this.clientsDocument.update(client);
}

deleteClient(id: string) {
  this.clientsDocument = this.clientsCollection.doc(id);
  this.clientsDocument.delete();
}

}
