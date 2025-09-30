import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';

@Component({
  selector: 'br-datepicker',
  standalone: true,
  template: `<div class="br-input has-icon">
    <label [for]="id()">{{ label() }}</label>
    <input #inputEl [id]="id()" type="text" [placeholder]="placeholder()" />
    <button
      #buttonEl
      class="br-button circle small"
      type="button"
      aria-label="Abrir seletor de data"
    >
      <i class="fas fa-calendar-alt" aria-hidden="true"></i>
    </button>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrDatepickerComponent),
      multi: true,
    },
  ],
})
export class BrDatepickerComponent
  implements ControlValueAccessor, AfterViewInit
{
  // Inputs para configuração
  label = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('');

  // Referências aos elementos do template
  private readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private readonly buttonEl =
    viewChild.required<ElementRef<HTMLButtonElement>>('buttonEl');

  private fpInstance: flatpickr.Instance | undefined;

  // Funções do ControlValueAccessor
  onChange: (value: Date | null) => void = () => {};
  onTouched: () => void = () => {};
  isDisabled = false;

  ngAfterViewInit(): void {
    // Inicializa o Flatpickr DEPOIS que a view estiver pronta
    //@ts-expect-error
    this.fpInstance = flatpickr(this.inputEl().nativeElement, {
      locale: Portuguese, // Usa o idioma português
      dateFormat: 'd/m/Y', // Formato de data brasileiro
      allowInput: true, // Permite que o usuário digite a data
      // O "wrap: true" permite usar um ícone externo como gatilho
      wrap: true,
      // Conecta o nosso botão ao Flatpickr
      trigger: this.buttonEl().nativeElement,

      // Callback: Quando o usuário seleciona uma data no calendário...
      onChange: (selectedDates) => {
        // ...nós notificamos o Angular Forms sobre o novo valor.
        this.onChange(selectedDates[0] || null);
        this.onTouched();
      },
    });
  }

  // --- Métodos do ControlValueAccessor ---

  writeValue(value: Date | string | null): void {
    // Seta o valor inicial no Flatpickr
    //@ts-expect-error
    this.fpInstance?.setDate(value, false);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.fpInstance?.set('disable', isDisabled ? [() => true] : []);
  }
}
