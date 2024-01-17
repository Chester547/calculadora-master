import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-showevent',
  templateUrl: './showevent.component.html',
  styleUrls: ['./showevent.component.scss'],
})
export class ShoweventComponent implements OnInit{
  email: string;
  admin: boolean = false;
  idd:any;
  loading: boolean = false
  newDatas : FileData[] = [];
  newDatass: any[];
  eventsIds: any[];
  eventIds: any[];
  datas:string;
  documentIds: { fullId: string, slicedId: string }[] = [];
  eventData: any[] = [];
  isLoading = true;

  constructor(private authService: AuthService, 
              private firestoreService :FirestoreService, 
              private router:Router, 
              private activedRoute: ActivatedRoute,  
              private loadingController: LoadingController)
  {
    this.authService.authState().subscribe( res => {
      console.log('res => ', res);
      if (res) {
        this.admin = res.uid === environment.adminuid ? true : false;
      } else {
        this.admin = false
      }
    })
  }

  ngOnInit() {
    this.authService.authState().subscribe(res => {
      console.log('res-> ', res);
        if (res){
          this.email = res.email;
        };
      })
    this.getDocumentIds();
    this.idd = this.activedRoute.snapshot.paramMap.get("id");
    console.log('id', this.idd);
  }

  async getDocumentIds(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando eventos...',
    });
    await loading.present();
    this.firestoreService
      .getCollections<any>('eventos')
      .snapshotChanges()
      .subscribe(
        snapshots => {
          this.documentIds = snapshots.map(snapshot => ({
            fullId: snapshot.payload.doc.id,
            slicedId: snapshot.payload.doc.id.slice(0, 5),
          }));
          this.isLoading = false; // Set isLoading to false once data is loaded
          loading.dismiss(); // Dismiss the loading indicator
        },
        error => {
          console.error('Error al obtener eventos:', error);
          this.isLoading = false; // Set isLoading to false in case of an error
          loading.dismiss(); // Dismiss the loading indicator
        }
      );
  }
  ionViewDidEnter() {
    this.getDocumentIds();
  }

  showNotification(){
    console.log("mensaje");
  }

  onButtonClick(fullId:any) {
    console.log('Boton presionado para el evento:', fullId);
    // You can add navigation logic or perform other actions here
  }

  panel(){
    this.router.navigate(['/panel'])
  }

}
