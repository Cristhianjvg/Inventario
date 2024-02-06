import { TestBed } from '@angular/core/testing';

import { NombreProductoService } from './nombre-producto.service';

describe('NombreProductoService', () => {
  let service: NombreProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NombreProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
