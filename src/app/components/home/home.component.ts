import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  protected onImageClick(event: Event): void {
    console.log(event.target);
    const element = event.target as HTMLDivElement;
    element.classList.toggle('active');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
