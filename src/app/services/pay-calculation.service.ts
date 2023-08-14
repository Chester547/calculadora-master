import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PayCalculationOptions } from '../models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayCalculationService {

  email: string;
  admin: boolean = false;
  idd:any;

  newDatas : UserData[] = [];
  newData : UserData = {
    cedula:null,
    nombre:null,
    email:null,
    uuid:null,
    password:null,
    alias: null
  };

  constructor(private authService: AuthService, private firestoreService :FirestoreService, private router:Router, private activedRoute: ActivatedRoute) {
    this.authService.authState().subscribe( res => {
      console.log('res => ', res);
      if (res) {
        this.admin = res.uid === environment.adminuid ? true : false;
      } else {
        this.admin = false
      }
      
    })
   }

  async calculatePay(userId: string, hoursWorked: number, options: PayCalculationOptions): Promise<number> {
    const user = await this.auth.currentUser;
    if (user) {
      const userDoc = this.firestoreService.getUsersFeed();
      return userDoc.get().toPromise().then((docSnapshot) => {
        const userData = docSnapshot.data();

        let payPerHour = 450 / (options.workingDaysPerMonth * options.dailyHours);
        
        if (options.foodPay && userData.foodPay) {
          payPerHour += 4;
        }

        if (options.transportPay && userData.transportPay) {
          payPerHour += 0.5;
        }

        if (options.nightShift && userData.nightShift) {
          payPerHour += payPerHour; // 100% increase for night shift (8 hours)
        }

        if (options.weekendOrHoliday && userData.weekendOrHoliday) {
          payPerHour += payPerHour; // 100% increase for weekend or holiday (8 hours)
        }

        payPerHour += (payPerHour * 0.0025 * hoursWorked); // 0.25% increase for payment subsidy
        payPerHour += (payPerHour * 0.01 * hoursWorked);   // 1% increase for family allowance

        return payPerHour * hoursWorked;
      });
    } else {
      throw new Error('User not authenticated');
    }
  }
}
