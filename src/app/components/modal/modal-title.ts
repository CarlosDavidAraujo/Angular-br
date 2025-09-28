import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'br-modal-title',
  template: `<h2 class="br-modal-title"><ng-content></ng-content></h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTitle {}
