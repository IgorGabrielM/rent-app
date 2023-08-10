import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { ContactModel } from '../models/contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private firestore: Firestore
  ) { }

  create(contact: ContactModel) {
    const asssetsRef = collection(this.firestore, 'contact')
    return addDoc(asssetsRef, { ...contact, } as ContactModel)
  }

  list() {
    const contactsRef = collection(this.firestore, 'contact')
    return collectionData(contactsRef, { idField: 'id' })
  }

  async find(id: string) {
    const assetsCategoryRef = collection(this.firestore, 'contact');
    return getDoc(doc(assetsCategoryRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  update(contact: ContactModel) {
    const contactDocRef = doc(this.firestore, `notes/${contact.id}`)
    return updateDoc(contactDocRef, { contact })
  }

  delete(contactId: number) {
    const contactDocRef = doc(this.firestore, `notes/${contactId}`)
    return deleteDoc(contactDocRef);
  }

}
