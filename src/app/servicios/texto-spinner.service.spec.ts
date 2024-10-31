import { TestBed } from '@angular/core/testing';

import { TextoSpinnerService } from './texto-spinner.service';

describe('TextoSpinnerService', () => {
  let service: TextoSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextoSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
