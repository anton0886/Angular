import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { CountryFilterPipe } from '../../../../shared/pipes/country-filter.pipe';

import { CountryBlockComponent } from './country-block.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CountryBlockComponent', () => {
  let component: CountryBlockComponent;
  let fixture: ComponentFixture<CountryBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CountryBlockComponent, CountryFilterPipe],
      providers: [
        importProvidersFrom(RouterModule.forRoot([])),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryBlockComponent);
    component = fixture.componentInstance;
    // provide minimal inputs used by the component
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('changing', new Subject<any>());
    fixture.componentRef.setInput('searchItem', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
