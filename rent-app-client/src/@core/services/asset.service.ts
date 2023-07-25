import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { AssetModel } from '../models/asset.model';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private firestore: Firestore
  ) { }

  create(asset: AssetModel) {
    const asssetsRef = collection(this.firestore, 'asset')
    return addDoc(asssetsRef, { ...asset, is_available: true, id_asset_category: asset.id_asset_category } as AssetModel)
  }

  list() {
    const assetsRef = collection(this.firestore, 'asset')
    return collectionData(assetsRef)
  }

  listByAssetCategory(idAssetCateogry: string) {
    const assetsRef = collection(this.firestore, 'asset');
    const q = query(assetsRef, where('id_asset_category', '==', idAssetCateogry));
    return collectionData(q);
  }

  update(asset: AssetModel) {
    const assetDocRef = doc(this.firestore, `notes/${asset.id}`)
    return updateDoc(assetDocRef, { asset })
  }

  delete(assetId: number) {
    const assetDocRef = doc(this.firestore, `notes/${assetId}`)
    return deleteDoc(assetDocRef);
  }

}
