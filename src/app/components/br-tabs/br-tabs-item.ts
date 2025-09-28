// br-tabs-item.ts
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  input,
  ElementRef,
} from '@angular/core';
import { BrTabs } from './br-tabs';

@Component({
  selector: 'br-tabs-item',
  template: `
    <li class="tab-item" [class.active]="isActive()">
      <button
        [id]="id()"
        type="button"
        role="tab"
        [attr.aria-selected]="isActive()"
        [attr.aria-controls]="panelId()"
        [tabindex]="isActive() ? 0 : -1"
      >
        <span class="name"><ng-content></ng-content></span>
      </button>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'activateTab()',
  },
})
export class BrTabsItem {
  private tabs = inject(BrTabs);
  private elementRef = inject(ElementRef<HTMLElement>);

  value = input.required<string>();

  id = computed(() => `br-tab-item-${this.value()}`);
  panelId = computed(() => `br-tab-panel-${this.value()}`);

  isActive = computed(() => this.tabs.activeValue() === this.value());

  focus(): void {
    this.elementRef.nativeElement.querySelector('button')?.focus();
  }

  protected activateTab(): void {
    this.tabs.selectTab(this.value());
  }
}
