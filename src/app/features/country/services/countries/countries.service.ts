import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICountries } from '../../components/country-list/model/countries.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = 'https://api.countrylayer.com/v2';

  getAllCountries(): Observable<Array<ICountries>> {
    const options = {
      params: {
        access_key: environment.countryApiKey,
      },
    };

    return this.http.get<Array<ICountries>>(`${this.rootUrl}/all`, options).pipe(delay(1000));
  }

  getFilteredCountries(value: string): Observable<Array<ICountries>> {
    const options = {
      params: {
        access_key: environment.countryApiKey,
        fulltext: 'true',
      },
    };

    return this.http
      .get<Array<ICountries>>(`${this.rootUrl}/regionalbloc/${value}`, options)
      .pipe(delay(1000));
  }
}
