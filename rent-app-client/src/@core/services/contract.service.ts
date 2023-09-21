import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { ContractModel } from '../models/contract.model';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(
    private firestore: Firestore
  ) { }

  create(contract: ContractModel) {
    const contractsRef = collection(this.firestore, 'contract')
    return addDoc(contractsRef, { ...contract, contactId: contract.contactId, createdAt: new Date() } as ContractModel)
  }

  list() {
    const contractsRef = collection(this.firestore, 'contract')
    return collectionData(contractsRef, { idField: 'id' })
  }

  getTermsServices() {
    const contractsRef = collection(this.firestore, 'contract_terms')
    return collectionData(contractsRef, { idField: 'id' })
  }

  async find(id: string) {
    const contractsCategoryRef = collection(this.firestore, 'contract');
    return getDoc(doc(contractsCategoryRef, id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return data;
        } else {
          return null;
        }
      })
  }

  update(contract: ContractModel) {
    const contractDocRef = doc(this.firestore, `contract/${contract.id}`)
    return updateDoc(contractDocRef, contract as {});
  }

  delete(contractId: string) {
    const contractDocRef = doc(this.firestore, `contract/${contractId}`)
    return deleteDoc(contractDocRef);
  }

}
