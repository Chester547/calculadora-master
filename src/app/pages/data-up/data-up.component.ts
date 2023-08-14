import { Component, OnInit } from '@angular/core';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FileData } from 'src/app/models';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-data-up',
  templateUrl: './data-up.component.html',
  styleUrls: ['./data-up.component.scss'],
})
export class DataUpComponent implements OnInit {

  newFile ='';
  newImage ='';
  newData : FileData = {
    categoria:'museos',
    nombre:null,
    newFile:null,
    detalle:null,
    id: null
  };


  constructor(private firestorage: FirestorageService,
              private firestoreService: FirestoreService,
              private router: Router) { }

  ngOnInit() {}

  async guardarData(){
    const path = 'feed';
    const name = this.newData.nombre;
    const id = this.newData.id;
    const res = await this.firestorage.uploadImage(this.newFile, path, name)
    this.newData.newFile=res;
    this.firestoreService.saveData(path, id, this.newData);
    console.log('recibi res de la promesa', res);
    console.log('fin de la funcion -> newImageUpload');
    if(res){
      this.router.navigate(['/feed']);
    }
  }

  async newImageUpload(event: any){
    if (event.target.files && event.target.files[0]){
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
