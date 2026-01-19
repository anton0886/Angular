import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IFilm } from '../films-list/model/films.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent {
  items = input<Array<IFilm>>([]);
}
