import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressEmpComponent } from './add-address-emp.component';

describe('AddAddressEmpComponent', () => {
  let component: AddAddressEmpComponent;
  let fixture: ComponentFixture<AddAddressEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAddressEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddressEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
