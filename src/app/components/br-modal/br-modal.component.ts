import { Component, input } from '@angular/core';
import {
  NgpDialog,
  NgpDialogOverlay,
  provideDialogState,
} from 'ng-primitives/dialog';

@Component({
  selector: 'br-modal',
  hostDirectives: [NgpDialogOverlay],
  imports: [NgpDialog],
  providers: [
    // We need to hoist the dialog state to the host component so that it can be used
    // within ng-content
    provideDialogState(),
  ],
  template: `
    <div ngpDialog class="br-modal">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './br-modal.component.css',
})
export class BrModal {}
