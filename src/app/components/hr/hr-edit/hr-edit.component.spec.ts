import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEditComponent } from './hr-edit.component';

describe('HrEditComponent', () => {
  let component: HrEditComponent;
  let fixture: ComponentFixture<HrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
