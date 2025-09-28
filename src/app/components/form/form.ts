import { Component, effect, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'br-form',
  template: `<ng-content></ng-content>`,
})
export class Form {
  formGroup = input.required<FormGroup>();
}
