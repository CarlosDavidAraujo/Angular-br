import { Component, input } from '@angular/core';
import { NgpTabButton } from 'ng-primitives/tabs';

@Component({
  selector: 'br-tabs-item',
  imports: [NgpTabButton],
  template: `
    <li class="tab-item">
      <button ngpTabButton [ngpTabButtonValue]="value()">
        <ng-content></ng-content>
      </button>
    </li>
  `,
  styles: `
    button[data-active] {
        border-bottom: 4px solid var(--active);
        color: var(--active);
    }
  `,
})
export class BrTabsItem {
  value = input.required<string>();
}
