import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IArticle } from '../components/articles-list/model/article.interface';
import { IArticles } from '../components/articles-list/model/articles.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly http = inject(HttpClient);

  private readonly rootUrl = 'https://newsapi.org/v2/top-headlines?';

  private readonly options = {
    params: {
      country: 'us',
      apiKey: environment.newsApiKey,
    },
  };

  getArticles(): Observable<IArticle[]> {
    return this.http
      .get<IArticles>(this.rootUrl, this.options)
      .pipe(map(({ articles }) => articles));
  }
}
