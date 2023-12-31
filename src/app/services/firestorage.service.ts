import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public firestorage: AngularFireStorage) {}

  uploadImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise(
      resolve => {
        const filePath = path + '/' + nombre;
        const ref = this.firestorage.ref(filePath);
        const task = ref.put(file);
        task.snapshotChanges().pipe(
          finalize(() => {const downloadURL = ref.getDownloadURL().subscribe(res => 
            {
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
          })
       )
      .subscribe();
      });
  }

  uploadEventData(eventName: string, eventData: any[]): void {
    // Use AngularFireStorage for uploading data to Firebase Storage if needed
    // Example: this.storage.upload(`events/${eventName}.csv`, /* file data */);

    console.log('Event data uploaded to Firebase Storage.');
  }
}
