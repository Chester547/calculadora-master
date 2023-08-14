import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileData, UserData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  editMuseo: FileData;
  editUser: UserData;

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage) { }
    
              
  saveData(path: string, id: string, data: any){
    return this.firestore.collection(path).doc(id).set(data);
  }

  getDoc<tipo>( path: string, id: string){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  createDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  } 

  updateDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  } 
  
  deleteDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  } 
  
  getCollectionQuery<tipo>(path: string, campo: string, query: string){
    return this.firestore.collection<tipo>(path, ref => 
      ref.where(campo, '==', query)).valueChanges()
    }

  getCollection<tipo>(path: string){
   const collection = this.firestore.collection<tipo>(path);
   return collection.valueChanges(); 
  }

  setMuseoFeed(fileData: FileData){
    this.editMuseo = fileData;
  }

  setUserFeed(userData: UserData){
    this.editUser = userData;
  }
  
  getMuseoFeed(){
    return this.editMuseo;
  }
  
  getUsersFeed(){
    return this.editUser;
  }
}
