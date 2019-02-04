import { TestBed } from '@angular/core/testing';

import { ExcelinfoService } from './excelinfo.service';

describe('ExcelinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelinfoService = TestBed.get(ExcelinfoService);
    expect(service).toBeTruthy();
  });
});
