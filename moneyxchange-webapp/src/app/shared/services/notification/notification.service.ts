import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Notification } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject: Subject<Notification> = new Subject();
  readonly notifier: Observable<Notification> = this.subject.asObservable();

  displayNotification(notification: Notification): void {
    this.subject.next(notification);
  }
}
