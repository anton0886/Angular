import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly rootUrl = 'https://someUrls';

  logIn(login: string, password: string): Observable<any> {
    const options = {
      headers: {
        Authentication: { login, password },
      },
    };

    return this.http.post<any>(this.rootUrl, options);
  }

  registry(body: any): Observable<any> {
    return this.http.post<any>(this.rootUrl, body);
  }
}
