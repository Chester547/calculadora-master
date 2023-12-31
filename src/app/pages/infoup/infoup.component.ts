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
    } else {
      console.error('No existe archivo');
    }
  }

  private parseFile(file: File): void {
    this.papa.parse(file, {
      complete: (result) => {
        // Assuming the first row contains headers and the data starts from the second row
        this.eventData = result.data.slice(1);
        console.log('Parsed data:', this.eventData);
      },
    });
  }

  confirmEvent(): void {
    // Add code to handle confirmation and store data in Firebase
    if (confirm('Are you sure all guests attended?')) {
      const eventName = this.eventData[0]?.name; // Assuming the event name is in the first row
      if (eventName) {
        this.storeEventData(eventName, this.eventData);
      } else {
        console.error('Event name not found in data.');
      }
    }
  }

/*   private storeEventData(eventName: string, eventData: any[]): void {
    this.firestoreService.setEventData(eventName, eventData);

    // Optionally, store event data in Firebase Storage
    this.firestorageService.uploadEventData(eventName, eventData);
  } */

  private storeEventData(eventName: string, eventData: any[]): void {
    this.firestoreService.setEventData(eventName, eventData);

    // Optionally, store event data in Firebase Storage
    this.firestorageService.uploadEventData(eventName, eventData);

/*     // Emit eventConfirmed to notify the parent component (if needed)
    this.eventConfirmed.emit(eventName);

    // Navigate to EventDetailsComponent
    this.router.navigate(['/event-details', eventName]); */
  }
}