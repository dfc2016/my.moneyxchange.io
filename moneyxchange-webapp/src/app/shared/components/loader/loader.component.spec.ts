import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader';

describe('LoaderComponent', () => {
  let loaderService: LoaderService;
  let loaderComponent: LoaderComponent;

  beforeEach(() => {
    loaderService = new LoaderService();
    loaderComponent = new LoaderComponent(loaderService);
  });

  it('should subscribe to loader notifier when component is initialized', () => {
    loaderComponent.ngOnInit();
    expect(loaderComponent.visible).toBe(false);

    loaderService.displayLoader();

    expect(loaderComponent.visible).toBe(true);
  });
});
