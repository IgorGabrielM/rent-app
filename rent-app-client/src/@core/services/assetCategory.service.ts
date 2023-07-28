import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, query, where } from '@angular/fire/firestore';
import { AssetCategoryModel } from '../models/assetCategory.model';


@Injectable({
  providedIn: 'root'
})
export class AssetCategoryService {

  constructor(
    private firestore: Firestore
  ) { }

  create(asset: AssetCategoryModel) {
    const asssetsRef = collection(this.firestore, 'asset_category')
    return addDoc(asssetsRef, asset as AssetCategoryModel)
  }

  list() {
    const assetsCategoryRef = collection(this.firestore, 'asset_category')
    return collectionData(assetsCategoryRef, { idField: 'id' })
  }

  async find(id: string) {
    const assetsCategoryRef = collection(this.firestore, 'asset_category');
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

}
