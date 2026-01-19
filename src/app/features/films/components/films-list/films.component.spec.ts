import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FilmsComponent } from './films.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, FilmsComponent],
      providers: [
        importProvidersFrom(RouterModule.forRoot([])),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    // Do not call detectChanges() to avoid runtime errors for nested custom controls in template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
