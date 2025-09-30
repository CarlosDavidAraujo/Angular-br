// br-modal-header.component.ts (AJUSTADO)

import { Component } from '@angular/core';
import { injectDialogRef } from 'ng-primitives/dialog'; // 👈 Use injectDialogRef

@Component({
  selector: 'br-modal-header',
  template: `
    <div class="br-modal-header">
      <h2 ngpDialogTitle><ng-content /></h2>
      <p ngpDialogDescription></p>
      <button
        class="br-button close circle"
        type="button"
        data-dismiss="br-modal"
        aria-label="Fechar"
        (click)="closeDialog()"
      >
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
    </div>
  `,
})
export class BrModalHeader {
  private dialogRef = injectDialogRef();

  closeDialog(): void {
    this.dialogRef.close();
  }
}
