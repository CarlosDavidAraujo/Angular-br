import {
  booleanAttribute,
  Component,
  effect,
  ElementRef,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'br-checkbox',
  standalone: true,
  template: `<div class="br-checkbox">
    <input
      #inputEl
      [id]="id()"
      type="checkbox"
      [name]="id()"
      [checked]="isChecked"
      [disabled]="isDisabled"
      (change)="onChange(!isChecked)"
      (blur)="onTouched()"
    />
    <label [for]="id()">{{ label() }}</label>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrCheckboxComponent),
      multi: true,
    },
  ],
})
export class BrCheckboxComponent implements ControlValueAccessor {
  // Entradas (inputs) para configurar o componente
  readonly label = input.required<string>();
  readonly id = input.required<string>();
  readonly indeterminate = input(false, { transform: booleanAttribute });

  // Referência ao elemento <input> no nosso template
  private readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  // Funções para comunicar o estado para o Angular Forms
  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  // Estado interno do checkbox (marcado/desmarcado)
  protected isChecked = false;
  protected isDisabled = false;

  constructor() {
    // Um "efeito" que observa a entrada `indeterminate`.
    // Quando ela muda, nós atualizamos a propriedade do elemento <input> nativo.
    effect(() => {
      if (this.inputEl()) {
        this.inputEl()!.nativeElement.indeterminate = this.indeterminate();
      }
    });
  }

  // --- Métodos do ControlValueAccessor ---

  writeValue(value: boolean): void {
    this.isChecked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
