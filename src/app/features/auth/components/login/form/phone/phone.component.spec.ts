import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PhoneComponent } from './phone.component';

describe('PhoneComponent', () => {
  let component: PhoneComponent;
  let fixture: ComponentFixture<PhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PhoneComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('objectForControlsPhone', new FormControl(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
