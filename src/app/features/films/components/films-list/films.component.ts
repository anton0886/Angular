import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { range, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FilmsService } from '../../services/films/films.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { IFilm, IFilms } from '../films-list/model/films.interface';
import { TextComponent } from '@features/auth/components/login/form/text/text.component';
import { FilmListComponent } from '../film-list/film-list.component';
import { LoaderForFilmsComponent } from '@shared/components/loader-for-films/loader-for-films.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  imports: [
    FormsModule,
    TextComponent,
    ReactiveFormsModule,
    FilmListComponent,
    LoaderForFilmsComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent implements OnInit, OnDestroy {
  private readonly filmsService = inject(FilmsService);
  private readonly loadingService = inject(LoadingService);
  private readonly destroy$ = new Subject<void>();

  protected readonly isSubmitted = signal<boolean>(false);
  protected readonly loadingPagination = signal<boolean>(false);

  protected readonly page = signal<number>(1);
  protected readonly totalPages = signal<number>(0);
  protected readonly maxPages = 100;
  protected readonly quantityButton = signal<number[]>([]);

  protected readonly films = signal<Array<IFilm>>([]);
  protected readonly totalResults = signal<string>('');

  options: Array<{ name: string; value: string }> = [
    { name: 'Movie', value: 'movie' },
    { name: 'Series', value: 'series' },
    { name: 'Episode', value: 'episode' },
  ];

  public filmNameControl!: FormControl<string | null>;
  public selectControl!: FormControl<{ name: string; value: string } | null>;

  public stateInput = '';
  public selectData = '';

  readonly isLoading: Subject<boolean> = this.loadingService.isLoading;
  readonly isLoadingContent: Subject<boolean> = this.loadingService.isLoadingContent;

  ngOnInit(): void {
    this.filmNameControl = new FormControl<string | null>(this.stateInput, [Validators.required]);

    this.selectControl = new FormControl<{ name: string; value: string } | null>(null, [
      Validators.required,
    ]);

    this.filmNameControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.stateInput = this.filmNameControl.value ?? '';
      }
    });

    this.selectControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.selectData = this.selectControl.value?.value ?? '';
      }
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);
    if (this.stateInput && this.selectData) {
      this.filmsService
        .getFilms(this.stateInput, this.selectData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: IFilms) => {
          this.films.set(response.Search);
          this.totalResults.set(response.totalResults);
          this.createPagination();
        });
    } else {
      console.log('Something went wrong!');
    }
  }

  protected onPageClick(page: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.page.set(page);
    this.getFilmByPage(page);
  }

  protected onPrevClick(event: Event): void {
    event.preventDefault();
    if (this.page() > 1) {
      this.prevPage();
      this.updateNumberOfPage('prev');
    }
  }

  protected onNextClick(event: Event): void {
    event.preventDefault();
    if (this.page() < this.totalPages() && this.maxPages > 10) {
      this.nextPage();
      this.updateNumberOfPage('next');
    }
  }

  private getFilmByPage(page: number): void {
    this.filmsService
      .getPage(String(page), this.stateInput, this.selectData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.films.set(response.Search);
        this.totalResults.set(response.totalResults);
      });
  }

  private createPagination(): void {
    this.totalPages.set(Math.ceil(Number(this.totalResults()) / 10));
    const buttons: number[] = [];
    if (this.totalPages() > 10) {
      range(1, 10)
        .pipe(
          map((i) => buttons.push(i)),
          takeUntil(this.destroy$),
        )
        .subscribe(() => this.quantityButton.set([...buttons]));
    } else {
      range(1, this.totalPages())
        .pipe(
          map((i) => buttons.push(i)),
          takeUntil(this.destroy$),
        )
        .subscribe(() => this.quantityButton.set([...buttons]));
    }
    this.loadingPagination.set(true);
  }

  private prevPage(): void {
    this.page.update((p) => p - 1);
    this.getFilmByPage(this.page());
  }

  private nextPage(): void {
    this.page.update((p) => p + 1);
    this.getFilmByPage(this.page());
  }

  private updateNumberOfPage(flag: string): void {
    const buttons: number[] = [];
    const iterator = 10;

    switch (flag) {
      case 'prev':
        if (this.page() <= 10) {
          range(0, iterator)
            .pipe(
              map((i) => {
                const number = iterator - i;
                return buttons.unshift(number);
              }),
              takeUntil(this.destroy$),
            )
            .subscribe(() => this.quantityButton.set([...buttons]));
        } else {
          range(this.page(), iterator)
            .pipe(
              map((i) => {
                const number = i - iterator + 1;
                return buttons.push(number);
              }),
              takeUntil(this.destroy$),
            )
            .subscribe(() => this.quantityButton.set([...buttons]));
        }
        break;
      case 'next':
        const maxPages = this.totalPages() - this.page();
        if (maxPages > 10) {
          range(this.page(), 10)
            .pipe(
              map((i) => buttons.push(i)),
              takeUntil(this.destroy$),
            )
            .subscribe(() => this.quantityButton.set([...buttons]));
        } else {
          range(this.page(), maxPages)
            .pipe(
              map((i) => buttons.push(i)),
              takeUntil(this.destroy$),
            )
            .subscribe(() => this.quantityButton.set([...buttons]));
        }
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
