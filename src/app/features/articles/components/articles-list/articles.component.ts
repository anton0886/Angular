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
import { ArticlesService } from '../../services/articles.service';
import { IArticle } from '../articles-list/model/article.interface';
import { ArticleComponent } from '../article/article.component';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [ArticleComponent, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private readonly articleServices = inject(ArticlesService);
  private readonly destroy$ = new Subject<void>();

  protected readonly postData = signal<Array<IArticle> | undefined>(undefined);

  ngOnInit(): void {
    this.articleServices
      .getArticles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((articles: Array<IArticle>) => {
        this.postData.set(articles);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
