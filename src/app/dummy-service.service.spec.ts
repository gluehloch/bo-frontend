/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DummyServiceService } from './dummy-service.service';

describe('DummyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DummyServiceService]
    });
  });

  it('should ...', inject([DummyServiceService], (service: DummyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
