import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-for-films',
  templateUrl: './loader-for-films.component.html',
  styleUrls: ['./loader-for-films.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderForFilmsComponent {}
