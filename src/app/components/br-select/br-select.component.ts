import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
  NgpCombobox,
  NgpComboboxButton,
  NgpComboboxDropdown,
  NgpComboboxInput,
  NgpComboboxOption,
  NgpComboboxPortal,
} from 'ng-primitives/combobox';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Component({
  selector: 'br-select',
  imports: [
    NgpCombobox,
    NgpComboboxDropdown,
    NgpComboboxOption,
    NgpComboboxInput,
    NgpComboboxPortal,
    NgpComboboxButton,
  ],
  providers: [provideValueAccessor(BrSelectComponent)],
  templateUrl: `br-select.component.html`,
  styleUrl: `br-select.component.css`,
})
export class BrSelectComponent implements ControlValueAccessor {
  /** The options for the combobox. */
  readonly options = input<string[]>([]);

  /** The selected value. */
  readonly value = model<string | undefined>();

  /** The placeholder for the input. */
  readonly placeholder = input<string>('');

  /** The disabled state of the combobox. */
  readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /** The filter value. */
  protected readonly filter = signal<string>('');

  /** Get the filtered options. */
  protected readonly filteredOptions = computed(() =>
    this.options().filter((option) =>
      option.toLowerCase().includes(this.filter().toLowerCase())
    )
  );

  /** Store the form disabled state */
  protected readonly formDisabled = signal(false);

  /** The on change callback */
  private onChange?: ChangeFn<string>;

  /** The on touch callback */
  protected onTouched?: TouchedFn;

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter.set(input.value);
  }

  writeValue(value: string | undefined): void {
    this.value.set(value);
    this.filter.set(value ?? '');
  }

  registerOnChange(fn: ChangeFn<string | undefined>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected onValueChange(value: string): void {
    this.onChange?.(value);
    // update the filter value
    this.filter.set(value);
  }

  protected resetOnClose(open: boolean): void {
    // if the dropdown is closed, reset the filter value
    if (open) {
      return;
    }

    // if the filter value is empty, set the value to undefined
    if (this.filter() === '') {
      this.value.set(undefined);
    } else {
      // otherwise set the filter value to the selected value
      this.filter.set(this.value() ?? '');
    }
  }
}
