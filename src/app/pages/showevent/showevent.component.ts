import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

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

/*   getDocumentIds(){
    const collectionPath = 'eventos'; // Replace with your actual collection path
  
    this.firestoreService
      .getCollections<any>(collectionPath)
      .snapshotChanges()
      .subscribe(
        snapshots => {
          // Retrieve all document IDs
          this.documentIds = snapshots.map(snapshot => snapshot.payload.doc.id);
          console.log('Document IDs:', this.documentIds);
        },
        error => {
          console.error('Error fetching documents:', error);
        }
      );
  } */

  getDocumentIds(): void {
    const collectionPath = 'eventos'; // Replace with your actual collection path
  
    this.firestoreService
      .getCollections<any>(collectionPath)
      .snapshotChanges()
      .subscribe(
        snapshots => {
          // Retrieve all document IDs and create an array with both full and sliced IDs
          this.documentIds = snapshots.map(snapshot => ({
            fullId: snapshot.payload.doc.id,
            slicedId: snapshot.payload.doc.id.slice(0, 5), // Adjust the slice parameters as needed
          }));
        },
        error => {
          console.error('Error fetching documents:', error);
        }
      );
  }

  ionViewDidEnter() {
    this.getDocumentIds();
  }

  showNotification(){
    console.log("mensaje");
  }

  onButtonClick(slicedId:any) {
    console.log('Button clicked for:', slicedId);
    // You can add navigation logic or perform other actions here
  }

}
