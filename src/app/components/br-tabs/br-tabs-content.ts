import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  input,
} from '@angular/core';
import { BrTabs } from './br-tabs';

@Component({
  selector: 'br-tabs-content',
  template: `
    @if (isActive()) {
    <div
      class="tab-panel active"
      [id]="panelId()"
      role="tabpanel"
      [attr.aria-labelledby]="itemId()"
      tabindex="0"
    >
      <ng-content></ng-content>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrTabsContent {
  private tabs = inject(BrTabs);

  value = input.required<string>();

  itemId = computed(() => `br-tab-item-${this.value()}`);
  panelId = computed(() => `br-tab-panel-${this.value()}`);

  isActive = computed(() => this.tabs.activeValue() === this.value());
}
