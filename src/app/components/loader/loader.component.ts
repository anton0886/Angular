import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingService } from '@core/services/loading/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  private loadingService = inject(LoadingService);

  isLoading: Subject<boolean> = this.loadingService.isLoading;
}
