import {
  Component,
  ChangeDetectionStrategy,
  model,
  contentChildren,
  afterNextRender,
} from '@angular/core';
import { BrTabsItem } from './br-tabs-item';

@Component({
  selector: 'br-tabs',
  template: `
    <div class="br-tab">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrTabs {
  activeValue = model.required<string>();

  private items = contentChildren(BrTabsItem, { descendants: true });

  constructor() {
    afterNextRender(() => {
      const items = this.items();
      // Se nenhuma aba foi definida como ativa, ativa a primeira da lista.
      if (items.length > 0 && this.activeValue() === null) {
        this.selectTab(items[0].value());
      }
    });
  }

  /**
   * Seleciona uma aba pelo seu valor.
   * @param value O valor da aba a ser ativada.
   */
  selectTab(value: string): void {
    this.activeValue.set(value);
  }

  private _navigate(offset: number): void {
    const items = this.items();
    console.log(items);
    if (items.length === 0) return;

    const currentIndex = items.findIndex(
      (item) => item.value() === this.activeValue()
    );
    const nextIndex = (currentIndex + offset + items.length) % items.length;

    const nextItem = items[nextIndex];
    if (nextItem) {
      this.selectTab(nextItem.value());
      nextItem.focus();
    }
  }

  /**
   * Navega para a próxima aba.
   */
  nextTab(): void {
    this._navigate(1);
  }

  /**
   * Navega para a aba anterior.
   */
  previousTab(): void {
    this._navigate(-1);
  }
}
