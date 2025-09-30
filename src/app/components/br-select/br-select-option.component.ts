import { Component, ElementRef, inject, input } from '@angular/core';
import { NgpComboboxOption } from 'ng-primitives/combobox';

@Component({
  selector: 'br-select-option',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpComboboxOption,
      inputs: ['ngpComboboxOptionValue: value'],
    },
  ],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'br-item',
  },
})
export class BrSelectOptionComponent {
  value = input.required<string | number>();

  private elementRef = inject(ElementRef);

  get label(): string {
    return (
      (this.elementRef.nativeElement as HTMLElement).textContent?.trim() ?? ''
    );
  }
}
