import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => (notificationService = new NotificationService()));

  it('should notify true when loader needs to be displayed', () => {
    notificationService.notifier.subscribe(notification => {
      expect(notification).toBeTruthy();
      expect(notification.title).toBe('Test notification');
    });

    notificationService.displayNotification({
      title: 'Test notification'
    });
  });
});
