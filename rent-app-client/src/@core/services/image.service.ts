import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        private afStorage: AngularFireStorage
    ) { }

    uploadImageBlob(blob: Blob) {
        const ref = this.afStorage.ref('signature/image.jpg')
        const task = ref.put(blob)
    }
}
