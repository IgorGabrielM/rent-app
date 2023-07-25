import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
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
    const assetsRef = collection(this.firestore, 'asset_category')
    return collectionData(assetsRef, { idField: 'id_asset_category' })
  }

}
