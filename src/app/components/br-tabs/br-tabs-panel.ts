import { Component, input } from '@angular/core';
import { NgpTabPanel } from 'ng-primitives/tabs';

@Component({
  selector: 'br-tabs-panel',
  imports: [NgpTabPanel],
  template: `
    <div ngpTabPanel [ngpTabPanelValue]="value()" class="tab-panel">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    [ngpTabPanel] {
      display: none !important;
    }

    [ngpTabPanel][data-active] {
      display: block !important;
    }
  `,
})
export class BrTabsPanel {
  value = input.required<string>();
}
