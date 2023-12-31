import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-showevent',
  templateUrl: './showevent.component.html',
  styleUrls: ['./showevent.component.scss'],
})
export class ShoweventComponent {
  @Input() eventName: string | undefined;

  constructor(private firestoreService: FirestoreService) {}

  finishEvent(): void {
    if (this.eventName) {
      this.firestoreService.finishEvent(this.eventName);
    } else {
      console.error('Event name is undefined.');
    }
  }
}
