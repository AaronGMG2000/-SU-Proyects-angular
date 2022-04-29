import { TestBed } from '@angular/core/testing';

import { CompaniaSeguroService } from './compania-seguro.service';

describe('CompaniaSeguroService', () => {
  let service: CompaniaSeguroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniaSeguroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
