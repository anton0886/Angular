import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IArticle } from '../articles-list/model/article.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  article = input.required<IArticle>();
}
