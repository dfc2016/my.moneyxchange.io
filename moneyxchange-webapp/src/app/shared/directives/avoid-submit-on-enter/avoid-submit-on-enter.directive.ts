import { Directive, HostListener } from '@angular/core';

import { KeyCode } from '../../constants/key-codes';

@Directive({
  selector: '[mxcAvoidSubmitOnEnter]'
})
export class AvoidSubmitOnEnterDirective {

  @HostListener('keyup', ['$event'])
  @HostListener('keypress', ['$event'])
  onKeyPress(event: any): void {
    if (KeyCode.enterPressed(event)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
