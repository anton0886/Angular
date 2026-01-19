import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CountriesService } from '@features/country/services/countries/countries.service';
import { CountryBlockComponent } from './country-block/country-block.component';
import { ICountries } from '@features/country/components/country-list/model/countries.interface';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  imports: [FormsModule, CountryBlockComponent, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit, OnDestroy {
  private readonly countriesService = inject(CountriesService);
  private readonly destroy$ = new Subject<void>();

  protected readonly countries = signal<Array<ICountries>>([]);
  protected readonly resetLoadingSignal = signal<boolean>(false);

  options: Array<{ value: string; name: string }> = [
    { value: 'all', name: 'All countries' },
    { value: 'EU', name: 'European Union' },
    { value: 'EFTA', name: 'European Free Trade Association' },
    { value: 'PA', name: 'Pacific Alliance' },
    { value: 'AU', name: 'African Union' },
    { value: 'USAN', name: 'Union of South American Nations' },
    { value: 'EEU', name: 'Eurasian Economic Union' },
    { value: 'AL', name: 'Arab League' },
    { value: 'ASEAN', name: 'Association of Southeast Asian Nations' },
    { value: 'CAIS', name: 'Central American Integration System' },
    { value: 'CEFTA', name: 'Central European Free Trade Agreement' },
    { value: 'NAFTA', name: 'North American Free Trade Agreement' },
    {
      value: 'SAARC',
      name: 'South Asian Association for Regional Cooperation',
    },
  ];

  protected readonly searchCountry = signal<string>('');
  userUpdatedEvent: Subject<Array<ICountries>> = new Subject();

  ngOnInit(): void {
    this.userUpdatedEvent.next(this.countries());

    this.countriesService
      .getAllCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.countries.set(response);
      });
  }

  protected onFilterChange(event: Event): void {
    const option = (event.target as HTMLSelectElement).value;
    this.resetLoadingSignal.set(true);

    const request$ =
      option === 'all'
        ? this.countriesService.getAllCountries()
        : this.countriesService.getFilteredCountries(option);

    request$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.countries.set(response);
      this.userUpdatedEvent.next(this.countries());
      this.resetLoadingSignal.set(false);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
