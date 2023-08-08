import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
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
    return collectionData(assetsRef, { idField: 'id' })
  }

  async find(id: string) {
    const assetsCategoryRef = collection(this.firestore, 'asset');
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

  listByAssetCategory(idAssetCateogry: string) {
    const assetsRef = collection(this.firestore, 'asset');
    const q = query(assetsRef, where('id_asset_category', '==', idAssetCateogry));
    return collectionData(q, { idField: 'id' });
  }

  update(asset: AssetModel) {
    const assetDocRef = doc(this.firestore, `asset/${asset.id}`)
    return updateDoc(assetDocRef, asset as {});
  }

  delete(assetId: number) {
    const assetDocRef = doc(this.firestore, `asset/${assetId}`)
    return deleteDoc(assetDocRef);
  }

}
