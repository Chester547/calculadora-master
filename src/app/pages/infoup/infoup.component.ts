import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-infoup',
  templateUrl: './infoup.component.html',
  styleUrls: ['./infoup.component.scss'],
})
export class InfoupComponent {
  selectedFile: File | undefined;
  eventData: any[] = [];
  eventName: any[] = [];

  constructor(
    private papa: Papa,
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
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
      },
    });
  }

  confirmEvent(): void {
    // Agregamos el codigo para confirmar la informacion y enviarla a firestore
    if (confirm('¿Esta seguro de la lista agregada?')) {
      const eventName = this.eventData[0]?.name; // Consideramos que el nombre del eventto se encuentra en la primera fila, definimos coomo 0
      if (eventName) {
        this.storeEventData(eventName, this.eventData);
      } else {
        console.error('Nombre del evento no encontrado.');
      }
    }
  }

/*   private storeEventData(eventName: string, eventData: any[]): void {
    this.firestoreService.setEventData(eventName, eventData);

    this.firestorageService.uploadEventData(eventName, eventData);
  } */

  private storeEventData(eventName: string, eventData: any[]): void {
    this.firestoreService.setEventData(eventName, eventData);

    this.firestorageService.uploadEventData(eventName, eventData);

/*     
    // Ruta a la pantalla del evento
    this.router.navigate(['/event-details', eventName]); */
  }
}