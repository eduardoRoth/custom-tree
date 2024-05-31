import { computed, Injectable, signal } from '@angular/core';
import { FolderFileModel } from '../models/folter-file.model';

@Injectable({
  providedIn: 'root',
})
export class FoldersAndFilesService {
  items = signal<Map<string, Array<FolderFileModel>>>(new Map());
  root = computed(() => {
    const all = this.items();
    return all.get('/');
  });

  loadDir(path: string = '/') {
    const numberOfFolders = Math.round(Math.random() * 30);
    const numberOfFiles = Math.round(Math.random() * 30);
    const folders = new Array(numberOfFolders)
      .fill(0)
      .map((): FolderFileModel => {
        const id = self.crypto.randomUUID();
        return {
          type: 'dir',
          name: id,
          path,
          id,
        };
      });
    const files = new Array(numberOfFiles).fill(0).map((): FolderFileModel => {
      const id = self.crypto.randomUUID();
      return {
        type: 'file',
        name: id,
        path,
        id,
      };
    });

    this.items.update((current) => current.set(path, [...folders, ...files]));
  }
}
