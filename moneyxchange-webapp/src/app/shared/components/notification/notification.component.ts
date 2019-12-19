import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../services/notification';

@Component({
  selector: 'mxc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private readonly displayTime: number = 4000;
  private subscription: Subscription;
  visible: boolean = false;

  title: string;
  message: string;

  constructor(private service: NotificationService) { }

  ngOnInit() {
    this.subscription = this.service.notifier.subscribe(notification => {
      this.visible = true;
      this.title = notification.title;
      this.message = notification.message;
      setTimeout(() => this.visible = false, this.displayTime);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
