import { TestBed } from '@angular/core/testing';

import { RelojPajaritoService } from './reloj-pajarito.service';

describe('RelojPajaritoService', () => {
  let service: RelojPajaritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelojPajaritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
