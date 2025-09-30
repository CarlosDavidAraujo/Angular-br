import { Component } from '@angular/core';
import { NgpLabel } from 'ng-primitives/form-field';

@Component({
  selector: 'br-form-label',
  standalone: true,
  imports: [NgpLabel],
  template: `
    <label ngpLabel class="tw-font-medium">
      <ng-content></ng-content>
    </label>
  `,
})
export class BrFormLabelComponent {}
