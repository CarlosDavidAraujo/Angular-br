import { Component, input } from '@angular/core';
import { NgpError } from 'ng-primitives/form-field';

export type ValidatorKey =
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'pattern'
  | 'min'
  | 'max'
  | (string & {});

@Component({
  selector: 'br-form-error',
  standalone: true,
  imports: [NgpError],
  template: `
    <p
      class="feedback danger d-none"
      ngpError
      [ngpErrorValidator]="validator()"
    >
      <i class="fas fa-times-circle" aria-hidden="true"></i>
      <ng-content></ng-content>
    </p>
  `,
  styles: `
      [ngpError][data-validator="fail"][data-dirty] {
      display: block !important;
    }`,
})
export class BrFormErrorComponent {
  validator = input.required<ValidatorKey>();
}
