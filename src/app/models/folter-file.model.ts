export interface FolderFileModel {
  type: 'dir' | 'file';
  name: string;
  path: string;
  id: string;
}
