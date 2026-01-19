import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @ViewChild('navigation') navigation!: ElementRef;

  protected onToggleClick(event: Event): void {
    const element = event.target as HTMLDivElement;
    element.classList.toggle('active');
    this.navigation.nativeElement.classList.toggle('active');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
