import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FoldersAndFilesService } from '../../services/folders-and-files.service';
import { FolderComponent } from '../../components/folder/folder.component';
import { FileComponent } from '../../components/file/file.component';
import { FolderFileModel } from '../../models/folter-file.model';

@Component({
  selector: 'app-all-items',
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>All Items</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      @for (item of root(); track item.id) {
        @if (item.type === 'dir') {
          <app-folder [folder]="item" (open)="load($event)" />
        } @else {
          <app-file [file]="item" />
        }
      }
    </ion-content>
  `,
  styles: ``,
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonItem,
    IonIcon,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    FolderComponent,
    FileComponent,
  ],
})
export class AllItemsPage implements OnInit {
  private readonly foldersAndFilesService = inject(FoldersAndFilesService);
  foldersAndFiles = this.foldersAndFilesService.items;
  root = computed(() => {
    const items = this.foldersAndFiles();
    return items.get('/');
  });

  ngOnInit() {
    this.foldersAndFilesService.loadDir();
  }

  load(path: string) {
    this.foldersAndFilesService.loadDir(path);
  }
}
