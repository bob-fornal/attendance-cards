import { TestBed } from '@angular/core/testing';

import { BroadcastChannelService } from './broadcast-channel.service';

describe('BroadcastChannelService', () => {
  let service: BroadcastChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
