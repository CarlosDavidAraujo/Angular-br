import { Component, forwardRef, inject } from '@angular/core';
import { FormItem } from './form-item'; // Importe o tipo

@Component({
  selector: 'br-form-label',
  template: `
    <label [for]="_formItem._fieldId()">
      <ng-content></ng-content>
    </label>
  `,
})
export class FormLabel {
  protected _formItem = inject(
    forwardRef(() => FormItem),
    { host: true }
  );
}
