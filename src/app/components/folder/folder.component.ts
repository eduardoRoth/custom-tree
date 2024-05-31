import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { FolderFileModel } from '../../models/folter-file.model';
import { addIcons } from 'ionicons';
import { folder } from 'ionicons/icons';
import { FoldersAndFilesService } from '../../services/folders-and-files.service';
import { FileComponent } from '../file/file.component';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    FileComponent,
  ],
  template: `
    @if (navigate()) {
      <ion-item button (click)="open.emit(folder().name)">
        <ion-icon name="folder" color="warning" slot="start"></ion-icon>
        <ion-label>
          {{ folder().name }}
        </ion-label>
      </ion-item>
    } @else {
      <ion-accordion-group>
        <ion-accordion value="folder" (click)="open.emit(folder().name)">
          <ion-item button slot="header">
            <ion-icon name="folder" color="warning" slot="start"></ion-icon>
            <ion-label>
              {{ folder().name }}
            </ion-label>
          </ion-item>
          @defer (on viewport) {
            <ion-list slot="content" class="children">
              @for (item of children(); track item.id) {
                @if (item.type === 'dir') {
                  <app-folder [folder]="item" (open)="(open.emit)" />
                } @else if (item.type === 'file') {
                  <app-file [file]="item" />
                }
              }
            </ion-list>
          } @placeholder (minimum 100ms) {
            <ion-list slot="content" />
          }
        </ion-accordion>
      </ion-accordion-group>
    }
  `,
  styles: `
    .children {
      padding-left: 24px;
    }
  `,
})
export class FolderComponent implements OnInit {
  private readonly foldersAndFilesService = inject(FoldersAndFilesService);
  folder = input.required<FolderFileModel>();
  navigate = input<boolean>(false);
  children = computed(() => {
    return this.foldersAndFilesService.items().get(this.folder().path);
  });
  open = output<string>();

  constructor() {
    addIcons({
      folder,
    });
  }

  ngOnInit(): void {
    this.foldersAndFilesService.loadDir(this.folder().path);
  }
}
