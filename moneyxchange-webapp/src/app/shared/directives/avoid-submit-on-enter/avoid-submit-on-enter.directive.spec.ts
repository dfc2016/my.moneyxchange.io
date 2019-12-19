import { AvoidSubmitOnEnterDirective } from './avoid-submit-on-enter.directive';
import { KeyCode } from '../../constants/key-codes';

describe('AvoidSubmitOnEnterDirective', () => {
  let directive: AvoidSubmitOnEnterDirective;

  beforeEach(() => directive = new AvoidSubmitOnEnterDirective());

  it('should stop event propagation when enter key is pressed', () => {
    const event: any = {
      keyCode: KeyCode.ENTER,
      stopPropagation: () => {},
      preventDefault: () => {}
    };
    const stopPropagation: jasmine.Spy = spyOn(event, 'stopPropagation');
    const preventDefault: jasmine.Spy = spyOn(event, 'preventDefault');

    directive.onKeyPress(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });

  it('should not stop event propagation when any key besides enter is pressed', () => {
    const event: any = {
      keyCode: KeyCode.CTRL,
      stopPropagation: () => {},
      preventDefault: () => {}
    };
    const stopPropagation: jasmine.Spy = spyOn(event, 'stopPropagation');
    const preventDefault: jasmine.Spy = spyOn(event, 'preventDefault');

    directive.onKeyPress(event);

    expect(preventDefault).not.toHaveBeenCalled();
    expect(stopPropagation).not.toHaveBeenCalled();
  });
});
