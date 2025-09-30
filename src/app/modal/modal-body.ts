import { Component, ChangeDetectionStrategy, model } from '@angular/core';

@Component({
  selector: 'br-modal-body',
  standalone: true,
  template: `<div class="br-modal-body">
    <ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBody {}
