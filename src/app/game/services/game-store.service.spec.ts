import { TestBed } from '@angular/core/testing';

import { GameStore } from './game-store.service';

describe('GameStoreService', () => {
  let service: GameStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
