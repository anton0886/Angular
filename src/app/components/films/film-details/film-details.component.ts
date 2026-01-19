import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilmsService } from '@features/films/services/films/films.service';
import { IFilmDetail } from '@features/films/components/films-list/model/films.interface';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly filmsService = inject(FilmsService);
  private readonly destroy$ = new Subject<void>();

  private id!: string;
  info!: IFilmDetail;

  constructor() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.filmsId;
    });
  }

  ngOnInit(): void {
    this.filmsService
      .getFilmDetails(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.info = response;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
