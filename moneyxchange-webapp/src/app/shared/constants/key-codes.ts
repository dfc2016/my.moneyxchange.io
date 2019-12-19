export class KeyCode {
  static readonly ENTER: number = 13;
  static readonly CTRL: number = 17;

  static enterPressed(event: any): boolean {
    return event.keyCode === KeyCode.ENTER;
  }
}
