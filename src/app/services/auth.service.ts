import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { getuid } from 'process';
import { UserData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private router: Router, 
              private firestore: AngularFirestore) { }

              
  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  registrar(user:UserData){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }
  authState(){
    return this.auth.authState /* referencia a estado de autenticacion/login */
  }
  logout(){
    this.auth.signOut();
  }
  stateUser(){
    return this.auth.authState;
  }
  async getUid(){
    const user = await this.auth.currentUser;
    return user.uid;
    console.log("uid => ", user.uid);
  }
  async updateUser(id: string, newData: any): Promise<void> {
    const user = await this.auth.currentUser;
    if (user) {
      // Update user data
      const userRef = this.firestore.collection('usuarios').doc(id);
      return userRef.update(newData);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
  getUser(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).valueChanges();
  }

async deleteUser(id: string): Promise<void> {
  const user = await this.auth.currentUser;
  if (user) {
    // Show confirmation alert
    const confirmed = window.confirm('Esta seguro de eliminar este usuario?');

    if (confirmed) {
      // Delete user data
      const userRef = this.firestore.collection('usuarios').doc(id);
      return userRef.delete();
    } else {
      // Usuario cancela el borrado
      return Promise.resolve();
    }
  } else {
    throw new Error('Usuario no autenticado');
  }
}

}
