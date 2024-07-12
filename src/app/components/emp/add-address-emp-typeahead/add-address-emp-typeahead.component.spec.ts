import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressEmpTypeaheadComponent } from './add-address-emp-typeahead.component';

describe('AddAddressEmpTypeaheadComponent', () => {
  let component: AddAddressEmpTypeaheadComponent;
  let fixture: ComponentFixture<AddAddressEmpTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAddressEmpTypeaheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddressEmpTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
