import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router } from '@angular/router';

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
    private firestorageService: FirestorageService,
    private router: Router
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
        this.router.navigate(['/eventos']);
      },
    });
  }
}