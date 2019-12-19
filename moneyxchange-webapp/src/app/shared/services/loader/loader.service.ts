import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private subject: Subject<boolean> = new Subject();
  readonly notifier: Observable<boolean> = this.subject.asObservable();

  displayLoader(): void {
    this.subject.next(true);
  }

  hideLoader(): void {
    this.subject.next(false);
  }
}
