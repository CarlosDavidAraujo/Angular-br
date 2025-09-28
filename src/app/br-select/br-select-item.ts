import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BrSelectComponent } from './br-select';

let nextId = 0;

@Component({
  selector: 'br-select-item',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
    '[attr.role]': "'option'",
    '[attr.aria-selected]': 'isSelected()',
    class: 'br-item',
    '[class.selected]': 'isSelected()',
    '[class.focus-visible]': 'isActive()',
    '[class.disabled]': 'isDisabled()',
    '[class.d-none]': '!isVisible()',
    '(click)': 'onSelect()',
  },
})
export class BrSelectItemComponent<T extends string | number>
  implements OnInit, OnDestroy
{
  public readonly id = `br-select-item-${nextId++}`;
  public value = input.required<T>();
  public disabled = input(false);

  private readonly select = inject(BrSelectComponent<T>, { host: true });
  public readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly isSelected = computed(
    () => this.select.value() === this.value()
  );
  public readonly isDisabled = computed(
    () => this.select.disabled() || this.disabled()
  );

  //@ts-expect-error
  public readonly isActive = computed(() => this.select.activeItem() === this);

  public readonly isVisible = computed(() => {
    const searchTerm = this.select.searchTerm().toLowerCase();
    if (!searchTerm) return true;
    const content =
      this.elementRef.nativeElement.textContent?.trim().toLowerCase() ?? '';
    return content.includes(searchTerm);
  });

  private itemIndex = -1;

  constructor() {
    effect(() => {
      if (this.isActive()) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  ngOnInit(): void {
    this.itemIndex = this.select.registerItem(this);
  }

  ngOnDestroy(): void {
    this.select.unregisterItem(this);
  }

  onSelect(): void {
    if (this.isDisabled()) return;
    const label = this.elementRef.nativeElement.textContent?.trim() ?? '';
    this.select.selectItem(this.value(), label, this.itemIndex);
  }
}
