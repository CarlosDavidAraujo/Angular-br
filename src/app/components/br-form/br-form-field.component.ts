import { Component } from '@angular/core';
import { NgpFormField } from 'ng-primitives/form-field';

@Component({
  selector: 'br-form-field',
  standalone: true,
  hostDirectives: [NgpFormField],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'd-flex-col',
  },
})
export class BrFormFieldComponent {}
