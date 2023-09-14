import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { TicketModel } from '../models/ticket.model';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private firestore: Firestore
  ) { }

  create(ticket: TicketModel) {
    const ticketRef = collection(this.firestore, 'ticket')
    return addDoc(ticketRef, ticket as TicketModel)
  }

  list() {
    const ticketRef = collection(this.firestore, 'ticket')
    return collectionData(ticketRef, { idField: 'id' })
  }

  async find(id: string) {
    const ticketRef = collection(this.firestore, 'ticket');
    return getDoc(doc(ticketRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  delete(ticketId: string) {
    const ticketDocRef = doc(this.firestore, `ticket/${ticketId}`)
    return deleteDoc(ticketDocRef);
  }

}
