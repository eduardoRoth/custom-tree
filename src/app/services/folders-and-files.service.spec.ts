import { TestBed } from '@angular/core/testing';

import { FoldersAndFilesService } from './folders-and-files.service';

describe('FoldersAndFilesService', () => {
  let service: FoldersAndFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoldersAndFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
