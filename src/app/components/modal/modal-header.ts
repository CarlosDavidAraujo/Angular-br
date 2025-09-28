import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Modal } from './modal';

@Component({
  selector: 'br-modal-header',
  standalone: true,
  template: `<div class="br-modal-header">
    <ng-content></ng-content>
    <button
      class="br-button close circle"
      type="button"
      data-dismiss="br-modal"
      aria-label="Fechar"
      (click)="modal.closeModal()"
    >
      <i class="fas fa-times" aria-hidden="true"></i>
    </button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeader {
  modal = inject(Modal);
}
