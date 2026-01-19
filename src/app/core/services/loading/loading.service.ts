import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  readonly isLoading = new Subject<boolean>();
  readonly isLoadingContent = new Subject<boolean>();

  show(): void {
    this.isLoading.next(true);
    this.isLoadingContent.next(false);
  }
  hide(): void {
    this.isLoading.next(false);
    this.isLoadingContent.next(true);
  }
}
