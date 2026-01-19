import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IFilmDetail,
  IFilms,
  IFilmsOriginal,
} from '../../components/films-list/model/films.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private readonly http = inject(HttpClient);

  private readonly rootUrl = 'http://www.omdbapi.com/?';
  private readonly apiKey = environment.omdbApiKey;

  getFilms(title: string, type: string): Observable<IFilms> {
    const options = {
      params: {
        s: title,
        type,
        apikey: this.apiKey,
      },
    };

    return this.http
      .get<IFilmsOriginal>(this.rootUrl, options)
      .pipe(map(({ Search, totalResults }) => ({ Search, totalResults })));
  }

  getFilmDetails(id: string): Observable<IFilmDetail> {
    const options = {
      params: {
        i: id,
        apikey: this.apiKey,
      },
    };

    return this.http.get<IFilmDetail>(this.rootUrl, options);
  }

  getPage(page: string, title: string, type: string): Observable<IFilms> {
    const options = {
      params: {
        s: title,
        type,
        page,
        apikey: this.apiKey,
      },
    };

    return this.http
      .get<IFilmsOriginal>(this.rootUrl, options)
      .pipe(map(({ Search, totalResults }) => ({ Search, totalResults })));
  }
}
