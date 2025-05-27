import { TestBed } from '@angular/core/testing';

import { UpdateLikesService } from './update-likes.service';

describe('UpdateLikesService', () => {
  let service: UpdateLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
