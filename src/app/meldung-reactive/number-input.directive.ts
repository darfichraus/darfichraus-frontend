import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[numeric]',
})
export class NumericDirective {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: string[] = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(private el: ElementRef) {
  }

  /**
   * checks input for numeric values
   */
  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent): void {
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
          return;
      }

      // Do not use event.keycode this is deprecated.
      // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      const current: string = this.el.nativeElement.value;
      // We need this because the current value on the DOM element
      // is not yet updated with the value from this event
      const next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
          event.preventDefault();
      }
  }
}
