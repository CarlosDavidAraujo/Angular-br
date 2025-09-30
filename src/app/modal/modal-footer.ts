import { Component, ChangeDetectionStrategy, model } from '@angular/core';

@Component({
  selector: 'br-modal-footer',
  standalone: true,
  template: `<div class="br-modal-footer justify-content-end">
    <ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooter {}
