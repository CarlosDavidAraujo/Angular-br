import { Component, computed, inject, input } from '@angular/core';
import { Form } from './form';

@Component({
  selector: 'br-form-item',
  template: `
    <div class="mb-3">
      <ng-content></ng-content>
      @if (hasError()) {
      <span class="feedback danger" role="alert" [id]="_messageId()">
        <i class="fas fa-times-circle" aria-hidden="true"></i>
        {{ getErrorMessage() }}
      </span>
      } @else if (infoMessage()) {
      <span class="feedback info" role="status" [id]="_infoId()">
        <i class="fas fa-info-circle" aria-hidden="true"></i>
        {{ infoMessage() }}
      </span>
      }
    </div>
  `,
})
export class FormItem {
  private parent = inject(Form, { host: true });

  name = input.required<string>();
  infoMessage = input<string>();

  // --- LÓGICA DE ACESSIBILIDADE ---

  // 1. Geração de IDs dinâmicos e previsíveis baseados no nome do campo.
  private _baseId = computed(() => `br-form-item-${this.name()}`);
  _fieldId = computed(() => `${this._baseId()}-field`);
  _messageId = computed(() => `${this._baseId()}-error`);
  _infoId = computed(() => `${this._baseId()}-info`);

  _ariaDescribedBy() {
    if (this.hasError()) return this._messageId();
    if (this.infoMessage()) return this._infoId();
    return null;
  }

  // --- LÓGICA DE ESTADO (EXISTENTE) ---

  field = computed(() => this.parent.formGroup().get(this.name()));

  hasError() {
    const field = this.field();
    return !!(field?.invalid && (field?.touched || field?.dirty));
  }

  getErrorMessage() {
    const errors = this.field()?.errors;
    if (!errors) return '';

    if (errors['required']) return 'Este campo é obrigatório.';
    if (errors['email']) return 'Por favor, insira um email válido.';
    if (errors['minlength'])
      return `O campo deve ter no mínimo ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['maxlength'])
      return `O campo deve ter no máximo ${errors['maxlength'].requiredLength} caracteres.`;

    return 'Valor inválido.';
  }
}
