import { Component, model } from '@angular/core';
import { NgpTabset, provideTabsetState } from 'ng-primitives/tabs';

@Component({
  selector: 'br-tabs',
  standalone: true,
  hostDirectives: [
    {
      directive: NgpTabset,
      inputs: ['ngpTabsetValue: value'],
    },
  ],
  providers: [provideTabsetState()],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'br-tab',
  },
})
export class BrTabs {
  value = model<string>();
}
