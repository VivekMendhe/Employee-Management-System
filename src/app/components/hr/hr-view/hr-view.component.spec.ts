import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewComponent } from './hr-view.component';

describe('HrViewComponent', () => {
  let component: HrViewComponent;
  let fixture: ComponentFixture<HrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
