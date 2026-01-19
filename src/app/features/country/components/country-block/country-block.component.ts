import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICountries } from '../country-list/model/countries.interface';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-country-block',
  templateUrl: './country-block.component.html',
  styleUrls: ['./country-block.component.scss'],
  imports: [LoaderComponent, SlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class CountryBlockComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  loaded = false;

  changing = input<Subject<Array<ICountries>>>(new Subject());
  data = input<Array<ICountries>>([]);
  searchItem = input<string>('');
  resetLoading = input<boolean>(false);

  private noteOfPage = 8;
  notes!: Array<ICountries>;
  private counter = 1;
  private currentData: Array<ICountries> = [];

  // Computed signal for filtered countries
  protected readonly filteredNotes = computed(() => {
    const search = this.searchItem().toLowerCase();
    if (!this.notes || this.notes.length === 0 || search === ' ') {
      return this.notes;
    }
    return this.notes.filter((country) => country.name.toLowerCase().includes(search));
  });

  constructor() {
    // Initialize currentData when data input changes
    effect(() => {
      const dataValue = this.data();
      if (dataValue && dataValue.length >= 0) {
        this.currentData = dataValue;
        this.loadData();
      }
    });

    // Reset loading state when parent requests it
    effect(() => {
      if (this.resetLoading()) {
        this.loaded = false;
      }
    });
  }

  ngOnInit(): void {
    this.changing()
      .pipe(takeUntil(this.destroy$))
      .subscribe((changingValue) => {
        this.currentData = changingValue;
        this.loadData();
      });
  }

  protected onMoreClick(event: Event): void {
    const element = event.target as HTMLButtonElement;
    this.showHideBlock(element, '.front', 'next');
  }

  protected onGoBackClick(event: Event): void {
    const element = event.target as HTMLButtonElement;
    this.showHideBlock(element, '.back', 'prev');
  }

  protected onWindowScroll(): void {
    if (this.currentData.length === this.notes?.length) {
      this.counter = 0;
      return;
    }

    const clientHeight = document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : document.body.clientHeight;
    const documentHeight = document.documentElement.scrollHeight
      ? document.documentElement.scrollHeight
      : document.body.scrollHeight;
    const scrollTop = window.pageYOffset
      ? window.pageYOffset
      : document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop;

    if (documentHeight - clientHeight <= scrollTop + 100) {
      this.counter = this.counter + 1;
      this.loadData();
    }
  }

  private loadData(): void {
    const start = (this.counter - 1) * this.noteOfPage;
    const end = start + this.noteOfPage;
    this.notes = this.currentData.slice(0, end);
    this.loaded = true;
  }

  private showHideBlock(element: HTMLButtonElement, findClass: string, direction: string): void {
    const parent = element.closest(findClass);
    let neighbor;

    switch (direction) {
      case 'next':
        neighbor = parent?.nextElementSibling;
        break;
      case 'prev':
        neighbor = parent?.previousElementSibling;
        break;
      default:
        break;
    }

    if (!parent?.classList.contains('active')) return;
    parent?.classList.remove('active');
    neighbor?.classList.add('active');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
