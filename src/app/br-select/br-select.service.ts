/* import { Injectable, signal, computed } from '@angular/core';
import { BrSelectItemComponent } from './br-select-item';

@Injectable()
export class BrSelectService<T extends string | number> {
  // --- Sinais de Estado Interno ---
  private readonly _isOpen = signal(false);
  private readonly _selectedLabel = signal('');
  private readonly _searchTerm = signal('');
  private readonly _activeIndex = signal(-1);
  private readonly _items = signal<BrSelectItemComponent<T>[]>([]);

  // --- Sinais Públicos (somente leitura, expostos para o componente) ---
  public readonly isOpen = this._isOpen.asReadonly();
  public readonly selectedLabel = this._selectedLabel.asReadonly();
  public readonly searchTerm = this._searchTerm.asReadonly();
  public readonly activeIndex = this._activeIndex.asReadonly();
  public readonly items = this._items.asReadonly();

  // --- Sinais Computados (lógica derivada) ---
  public readonly visibleItems = computed(() =>
    this.items().filter((item) => item.isVisible())
  );
  public readonly activeItem = computed<BrSelectItemComponent<T> | null>(() => {
    const visible = this.visibleItems();
    const index = this.activeIndex();
    return index >= 0 && visible.length > 0 ? visible[index] : null;
  });
  public readonly activeDescendantId = computed(
    () => this.activeItem()?.id ?? null
  );

  // --- Métodos Públicos  ---
  public open(): void {
    if (!this._isOpen()) {
      this._isOpen.set(true);
    }
  }

  public close(): void {
    if (this._isOpen()) {
      this._isOpen.set(false);
      this._searchTerm.set('');
      this._activeIndex.set(-1);
    }
  }

  public toggle(): void {
    this._isOpen.update((open) => !open);
    if (!this._isOpen()) {
      this.close();
    }
  }

  public setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    this._activeIndex.set(-1); // Reseta o foco ao pesquisar
    this.open();
  }

  public navigate(direction: 'up' | 'down'): void {
    const visible = this.visibleItems();
    if (!visible.length) return;

    if (direction === 'down') {
      this._activeIndex.update((index) => (index + 1) % visible.length);
    } else {
      this._activeIndex.update(
        (index) => (index - 1 + visible.length) % visible.length
      );
    }
  }

  public registerItem(item: BrSelectItemComponent<T>): number {
    this._items.update((currentItems) => [...currentItems, item]);
    return this.items().length - 1;
  }

  public unregisterItem(item: BrSelectItemComponent<T>): void {
    this._items.update((currentItems) =>
      currentItems.filter((i) => i !== item)
    );
  }

  public updateLabel(label: string): void {
    this._selectedLabel.set(label);
  }

  public updateLabelFromValue(value: T | null): void {
    if (value === null) {
      this._selectedLabel.set('');
      return;
    }
    const matchingItem = this.items().find((item) => item.value() === value);
    if (matchingItem) {
      const label =
        matchingItem.elementRef.nativeElement.textContent?.trim() ?? '';
      this._selectedLabel.set(label);
    }
  }
}
 */
