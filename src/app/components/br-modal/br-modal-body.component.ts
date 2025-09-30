import { Component } from '@angular/core';

@Component({
  selector: 'br-modal-body',
  template: ` <div class="br-modal-body">
    <ng-content />
  </div>`,
})
export class BrModalBody {}
