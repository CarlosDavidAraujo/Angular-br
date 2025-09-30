import { Component } from '@angular/core';

@Component({
  selector: 'br-modal-footer',
  template: `<div class="br-modal-footer justify-content-end">
    <ng-content></ng-content>
  </div>`,
})
export class BrModalFooter {}
