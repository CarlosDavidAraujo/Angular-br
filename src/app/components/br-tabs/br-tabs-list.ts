import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BrTabs } from './br-tabs';

@Component({
  selector: 'br-tabs-list',
  template: `
    <nav class="tab-nav" role="tablist" aria-label="Navegação por abas">
      <ul>
        <ng-content></ng-content>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown.arrowRight)': 'tabs.nextTab()',
    '(keydown.arrowLeft)': 'tabs.previousTab()',
  },
})
export class BrTabsList {
  protected tabs = inject(BrTabs);
}
