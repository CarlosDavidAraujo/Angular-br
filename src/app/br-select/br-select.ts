import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  signal,
  computed,
  viewChild,
  effect,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrSelectItemComponent } from './br-select-item';
import { BrIdentifiableFormControl } from '../components/form/identifiable-form-control';

let nextId = 0;

@Component({
  selector: 'br-select',
  templateUrl: `./br-select.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(focusout)': 'onFocusOut($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrSelectComponent),
      multi: true,
    },
    {
      provide: BrIdentifiableFormControl,
      useExisting: forwardRef(() => BrSelectComponent),
    },
  ],
})
export class BrSelectComponent<T extends string | number>
  extends BrIdentifiableFormControl
  implements ControlValueAccessor
{
  private hasInteracted = false;
  public value = model<T | null>(null);
  public placeholder = input<string>('Selecione uma opção...');
  public disabled = model<boolean>(false);

  public readonly isOpen = signal(false);
  public readonly selectedLabel = signal<string>('');
  public readonly searchTerm = signal('');
  public readonly activeIndex = signal(-1);

  private readonly items = signal<BrSelectItemComponent<T>[]>([]);
  public readonly visibleItems = computed(() =>
    this.items().filter((item) => item.isVisible())
  );

  //@ts-expect-error
  public readonly activeItem = computed<BrSelectItemComponent<T> | null>(() => {
    const visible = this.visibleItems();
    const index = this.activeIndex();
    return index >= 0 && visible.length > 0 ? visible[index] : null;
  });

  public readonly activeDescendantId = computed(
    () => this.activeItem()?.id ?? null
  );
  public readonly displayValue = computed(() => {
    if (this.isOpen()) return this.searchTerm();
    return this.selectedLabel() || '';
  });

  public readonly panelId = computed(() => `${this.id()}-panel`);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly inputElement =
    viewChild<ElementRef<HTMLInputElement>>('inputElement');

  constructor() {
    super();
    effect(() => {
      // Sincroniza o `value` model com o `ControlValueAccessor`
      this.onChange(this.value());
      this.updateLabelFromValue(this.value());
    });
  }

  public setId(id: string): void {
    this._id.set(id);
  }

  private updateLabelFromValue(value: T | null): void {
    if (value === null) {
      this.selectedLabel.set('');
      return;
    }
    // Adiciona uma verificação para garantir que `items` foi inicializado
    if (this.items().length > 0) {
      const matchingItem = this.items().find((item) => item.value() === value);
      if (matchingItem) {
        const label =
          matchingItem.elementRef.nativeElement.textContent?.trim() ?? '';
        this.selectedLabel.set(label);
      }
    }
  }

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  registerItem(item: BrSelectItemComponent<T>): number {
    this.items.update((currentItems) => [...currentItems, item]);
    return this.items().length - 1;
  }

  unregisterItem(item: BrSelectItemComponent<T>): void {
    this.items.update((currentItems) => currentItems.filter((i) => i !== item));
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node))
      this.close();
  }

  onFocusOut(event: FocusEvent): void {
    const newFocusedElement = event.relatedTarget as HTMLElement | null;
    if (!this.elementRef.nativeElement.contains(newFocusedElement)) {
      this.close();
    }
  }

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(-1);
    this.open();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const visibleItems = this.visibleItems();
    if (!visibleItems.length && event.key !== 'Escape') return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((index) => (index + 1) % visibleItems.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(
          (index) => (index - 1 + visibleItems.length) % visibleItems.length
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (this.isOpen() && this.activeItem()) {
          this.activeItem()?.onSelect();
        } else {
          this.toggle();
        }
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  toggle(): void {
    if (this.disabled()) return;
    this.isOpen.update((open) => !open);
    if (this.isOpen()) this.inputElement()?.nativeElement.focus();
    else this.onTouched();
  }

  open(): void {
    if (!this.isOpen() && !this.disabled()) this.isOpen.set(true);
  }

  close(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.searchTerm.set('');
      this.activeIndex.set(-1);
      if (this.hasInteracted) {
        this.onTouched();
      }
    }
  }

  selectItem(value: T, label: string, index: number): void {
    this.hasInteracted = true;
    this.value.set(value);
    this.selectedLabel.set(label);
    this.close();
  }

  writeValue(value: T | null): void {
    this.value.set(value);
  }
  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
