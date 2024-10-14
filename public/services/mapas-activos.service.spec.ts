import { TestBed } from '@angular/core/testing';

import { MapasActivosService } from './mapas-activos.service';

describe('MapasActivosService', () => {
  let service: MapasActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapasActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
