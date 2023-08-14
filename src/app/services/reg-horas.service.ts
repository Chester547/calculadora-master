import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegHorasService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  async registerTimeIn(userId: string, timestamp: any): Promise<void> {
    const user = await this.auth.currentUser;
    if (user) {
      const timeInData = {
        userId: userId,
        timestamp: timestamp,
        type: 'in'
      };

      this.firestore.collection('registro-hora').add(timeInData);
    } else {
      throw new Error('Usuario no registrado');
    }
  }

  async registerTimeOut(userId: string, timestamp: any): Promise<void> {
    const user = await this.auth.currentUser;
    if (user) {
      const timeOutData = {
        userId: userId,
        timestamp: timestamp,
        type: 'out'
      };

      this.firestore.collection('registro-hora').add(timeOutData);
    } else {
      throw new Error('Usuario no registrado');
    }
  }

  getTimeTracking(userId: string): Observable<any[]> {
    return this.firestore.collection('registro-hora', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}
