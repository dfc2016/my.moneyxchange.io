import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => (loaderService = new LoaderService()));

  it('should notify true when loader needs to be displayed', () => {
    loaderService.notifier.subscribe(displayLoader =>
      expect(displayLoader).toBe(true)
    );

    loaderService.displayLoader();
  });

  it('should notify false when loader needs to be hidden', () => {
    loaderService.notifier.subscribe(displayLoader =>
      expect(displayLoader).toBe(false)
    );

    loaderService.hideLoader();
  });
});
