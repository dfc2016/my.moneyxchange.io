import { fakeAsync, tick } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../services/notification';

describe('NotificationComponent', () => {
  let notificationService: NotificationService;
  let notificationComponent: NotificationComponent;

  beforeEach(() => {
    notificationService = new NotificationService();
    notificationComponent = new NotificationComponent(notificationService);
  });

  it('should subscribe to notification notifier when component is initialized', () => {
    notificationComponent.ngOnInit();
    expect(notificationComponent.visible).toBe(false);

    notificationService.displayNotification({
      title: 'Test title',
      message: 'Test message',
    });

    expect(notificationComponent.visible).toBe(true);
  });

  it('should show notification when notifier emits new notification', () => {
    notificationComponent.ngOnInit();
    expect(notificationComponent.visible).toBe(false);
    expect(notificationComponent.title).toBeUndefined();
    expect(notificationComponent.message).toBeUndefined();

    notificationService.displayNotification({
      title: 'Test title',
      message: 'Test message',
    });

    expect(notificationComponent.visible).toBe(true);
    expect(notificationComponent.title).toBe('Test title');
    expect(notificationComponent.message).toBe('Test message');
  });

  it('should hide notification when notification timeout completes', fakeAsync(() => {
    notificationComponent.ngOnInit();
    notificationService.displayNotification({
      title: 'Test title',
      message: 'Test message',
    });
    expect(notificationComponent.visible).toBe(true);

    tick(4000);

    expect(notificationComponent.visible).toBe(false);
  }));
});
