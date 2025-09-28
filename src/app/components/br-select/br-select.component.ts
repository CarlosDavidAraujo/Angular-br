import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import {
  NgpSelect,
  NgpSelectDropdown,
  NgpSelectOption,
  NgpSelectPortal,
} from 'ng-primitives/select';
import { NgpButton } from 'ng-primitives/button';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

export interface BrSelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'br-select',
  standalone: true,
  imports: [
    FormsModule,
    NgpSelect,
    NgpSelectDropdown,
    NgpSelectOption,
    NgpSelectPortal,
    NgpButton,
  ],
  providers: [provideValueAccessor(BrSelectComponent)],
  styleUrl: './br-select.component.css',
  templateUrl: './br-select.component.html',
  hostDirectives: [
    {
      directive: NgpSelect,
      inputs: ['ngpSelectDisabled: disabled'],
    },
  ],
})
export class BrSelectComponent implements ControlValueAccessor {
  readonly options = input.required<BrSelectOption[]>();
  readonly placeholder = input<string>('Selecione o item');
  readonly label = input.required<string>();
  readonly id = input.required<string>();
  readonly disabled = model(false);

  readonly value = model<any>();
  protected readonly searchTerm = signal('');

  private readonly select = inject(NgpSelect, { self: true });
  readonly open = computed(() => this.select.open());

  readonly filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.options();
    return this.options().filter((option) =>
      option.label.toLowerCase().includes(term)
    );
  });

  readonly displayValue = computed(() => {
    const selectedOption = this.options().find(
      (opt) => opt.value === this.value()
    );
    return selectedOption?.label || ''; // Retorna string vazia se nada selecionado
  });

  private onChange?: ChangeFn<any>;
  private onTouched?: TouchedFn;

  constructor() {
    effect(() => this.onChange?.(this.value()));
  }

  writeValue = (value: any) => this.value.set(value);
  registerOnChange = (fn: ChangeFn<any>) => (this.onChange = fn);
  registerOnTouched = (fn: TouchedFn) => (this.onTouched = fn);
  setDisabledState = (isDisabled: boolean) => this.disabled.set(isDisabled);
}
