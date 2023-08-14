import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

  newImage ='';
  newUser: UserData = {
    email:null,
    password:null,
    nombre:null,
    alias:null,
    uuid:null,
    cedula:null
  };
  mensaje : string = null;

  repassword: string = null;

  admin: boolean = false;

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService,
              private router: Router) { 
                this.authService.authState().subscribe( res => {
                  console.log('res => ', res);
                  if (res) {
                    this.admin = res.uid === environment.adminuid ? true : false;
                  } else {
                    this.admin = false
                  }
                  
                })

              }

  ngOnInit() {}

  async registro(){
    if(this.newUser.password != this.repassword){
      console.log('error');
    }
    const res = await this.authService.registrar(this.newUser);
    console.log('esta es la respuesta-> ', res);
    if (res){
      const path = 'usuarios';
      const id = res.user.uid;
      this.newUser.uuid= id;
      const rest = this.firestoreService.saveData(path, id, this.newUser);
      console.log('respuesta-> ', rest);
      this.router.navigate(['/']);
    }
  }

  /* async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newUser.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }
  } */

  profile(){
    this.router.navigate(['/profile'])
  }
  logClick(){
    this.router.navigate(['/'])
  }
  panel(){
    this.router.navigate(['/panel'])
  }

  
}
