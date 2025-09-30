import { Component, inject, input } from '@angular/core';
import { NgpInput } from 'ng-primitives/input';

export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'success' | 'danger' | 'warning' | 'info' | 'default';

@Component({
  selector: 'input[brInput]',
  hostDirectives: [{ directive: NgpInput, inputs: ['disabled'] }],
  template: '',
  styleUrl: './br-input.component.css',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-status]': 'status()',
  },
})
export class BrInputComponent {
  readonly size = input<InputSize>('medium');
  readonly status = input<InputStatus>('default');
}
