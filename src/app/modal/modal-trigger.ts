import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Modal } from './modal';

@Component({
  selector: '[br-modal-trigger]',
  standalone: true,
  template: ` <ng-content></ng-content> `,
  host: {
    '(click)': 'modal.openModal()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTrigger {
  modal = inject(Modal);
}
