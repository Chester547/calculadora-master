import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-infoup',
  templateUrl: './infoup.component.html',
  styleUrls: ['./infoup.component.scss'],
})
export class InfoupComponent {
  selectedFile: File | undefined;
  eventData: any[] = [];
  eventName: any[] = [];
  eventNameInput:string;

  uploadForm: FormGroup;
  isLoading = false;

  assistantsList: { name: string, lastname: string }[] = []; // Adjust this type as per your actual structure


  constructor(
    private papa: Papa,
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) 
{
  this.uploadForm = this.fb.group({
    eventName: ['', Validators.required],
    assistants: ['', Validators.required],
    // Add other fields as needed
  });
}

  panel(){
    this.router.navigate(['/panel'])
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  /* uploadFile(): void {
    if (this.selectedFile) {
      this.parseFile(this.selectedFile);
      const eventName = this.eventData[0];
    } else {
      console.error('No existe archivo');
    }
  }

  private parseFile(file: File): void {
    this.papa.parse(file, {
      complete: (result) => {
        // Aqui definimos la lectura de los datos de los asistentes y los mostramos en consola (Chrome CTRL+SHIFT+I consola)
        this.eventName = result.data.slice(0);
        this.eventData = result.data.slice(1);
        console.log('Evento:', this.eventName[0]);
        console.log('Datos leidos:', this.eventData);
        this.router.navigate(['/eventos']);
      },
    });
  }

  async uploadDocument(): Promise<void> {
    if (this.uploadForm.valid && !this.isLoading) {
      const eventData = this.uploadForm.value;
      const eventId = eventData.eventName; // Use the event name as the document ID

      const loading = await this.loadingController.create({
        message: 'Uploading document...',
      });
      await loading.present();

      this.firestoreService
        .getCollections<any>('events')
        .doc(eventId)
        .set(eventData)
        .then(() => {
          console.log('Document uploaded successfully!');
          this.presentToast('Document uploaded successfully!');
          this.uploadForm.reset();
        })
        .catch(error => {
          console.error('Error uploading document:', error);
          this.presentToast('Error uploading document');
        })
        .finally(() => {
          loading.dismiss();
          this.isLoading = false;
        });
    } else {
      console.error('Form is invalid or upload in progress. Cannot upload document.');
      this.presentToast('Invalid form or upload in progress');
    }
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  } */
 
}