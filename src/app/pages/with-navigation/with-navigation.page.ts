import { Component, computed, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FileComponent } from '../../components/file/file.component';
import { FolderComponent } from '../../components/folder/folder.component';
import { FoldersAndFilesService } from '../../services/folders-and-files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-navigation',
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ path() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      @for (item of current(); track item.id) {
        @if (item.type === 'dir') {
          <app-folder [folder]="item" (open)="load($event)" [navigate]="true" />
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
    FileComponent,
    FolderComponent,
    IonBackButton,
    IonButtons,
  ],
})
export class WithNavigationPage implements OnInit {
  private readonly foldersAndFilesService = inject(FoldersAndFilesService);
  private readonly router = inject(Router);

  path = input.required<string>();
  foldersAndFiles = this.foldersAndFilesService.items;
  current = computed(() => {
    return this.foldersAndFiles().get(this.path());
  });

  ngOnInit() {
    this.foldersAndFilesService.loadDir(this.path());
  }

  async load(path: string) {
    await this.router.navigateByUrl(`/with-navigation/${path}`);
  }
}
