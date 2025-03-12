import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTransitionComponent } from './round-transition.component';

describe('RoundTransitionComponent', () => {
  let component: RoundTransitionComponent;
  let fixture: ComponentFixture<RoundTransitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoundTransitionComponent]
    });
    fixture = TestBed.createComponent(RoundTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
