import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

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
/*   usuario='usuario';
  campo: 'usuarios'; */
  /* private path: 'feed/{{categorias}}/data'; */
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
  
  /* const path: 'feed/'; */
  ngOnInit() {
    this.authService.authState().subscribe(res => {
      console.log('res-> ', res);
        if (res){
          this.email = res.email;
        };
      })
    this.getFeed();
    this.idd = this.activedRoute.snapshot.paramMap.get("id");
    console.log('id', this.idd);
    
  }

  getFeed(){
    this.firestoreService.getCollection<UserData>('usuarios/').subscribe(res => {
      this.newDatas = res;
      console.log(res);
    });
  }

  edit(direccion:string){
    this.router.navigate([direccion])
  }
  update(direccion:string){
    this.router.navigate([direccion])
  }
  delete(){
    this.router.navigate(['/panel'])
  }
  
  detailItem(usuario:UserData){
    console.log('detalle nombre ', usuario);
    this.firestoreService.setUserFeed(usuario);
  }

}
