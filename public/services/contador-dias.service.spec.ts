import { TestBed } from '@angular/core/testing';

import { ContadorDiasService } from './contador-dias.service';

describe('ContadorDiasService', () => {
  let service: ContadorDiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContadorDiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
