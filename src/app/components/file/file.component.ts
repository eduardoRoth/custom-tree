import { Component, input } from '@angular/core';
import { IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FolderFileModel } from '../../models/folter-file.model';
import { addIcons } from 'ionicons';
import { document } from 'ionicons/icons';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [IonIcon, IonItem, IonLabel],
  template: `
    <ion-item>
      <ion-icon name="document" color="medium" slot="start"></ion-icon>
      <ion-label>
        {{ file().name }}
      </ion-label>
    </ion-item>
  `,
  styles: ``,
})
export class FileComponent {
  file = input.required<FolderFileModel>();
  constructor() {
    addIcons({
      document,
    });
  }
}
