import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  uid: string = null;
  admin: boolean = false;
  correo: string = null;
  info: UserData = null;

  constructor(private authService: AuthService,
              private firestoreService :FirestoreService,
              private router:Router) { 
                this.authService.authState().subscribe( res => {
                  console.log('res => ', res);
                  if (res) {
                    this.admin = res.uid === environment.adminuid ? true : false;
                  } else {
                    this.admin = false
                  }
                })
              }

  ngOnInit() {this.authService.authState().subscribe(res => {
    console.log('res-> ', res);
    if (res){
      this.correo = res.email;
    };
  });
  this.getUid();
}

async getUid(){
  const uid = await this.authService.getUid();
  if (uid){
    this.uid = uid;
    console.log('uid', this.uid);
    this.getInfoUser();
  }
  else{
    console.log('no existe');
  }
}

getInfoUser(){
  const path = 'usuarios';
  const id = this.uid;
  this.firestoreService.getDoc<UserData>(path, id).subscribe(resp => {
    if(resp){
      this.info = resp;
    }
    console.log('datos', resp);
  })
}

regClick(){
  this.router.navigate(['/registro'])
}

dataUp(){
  this.router.navigate(['/carga'])
}

feed(){
  this.router.navigate(['/feed'])
}

userManager(){
  this.router.navigate(['/control'])
}

profile(){
  this.router.navigate(['/profile'])
}

logout(){
  this.authService.logout();
  this.router.navigate(['/']);
}
}
