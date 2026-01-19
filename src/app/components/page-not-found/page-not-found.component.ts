import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  public move(event: MouseEvent): void {
    const x = event.clientX / 10;
    const y = -event.clientY / 10;

    (event.target as HTMLDivElement).style.backgroundPositionX = `${x}px`;
    (event.target as HTMLDivElement).style.backgroundPositionY = `${y}px`;
  }
}
