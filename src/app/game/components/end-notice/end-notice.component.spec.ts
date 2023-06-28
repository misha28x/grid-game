import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndNoticeComponent } from './end-notice.component';

describe('EndNoticeComponent', () => {
  let component: EndNoticeComponent;
  let fixture: ComponentFixture<EndNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EndNoticeComponent],
    });
    fixture = TestBed.createComponent(EndNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
