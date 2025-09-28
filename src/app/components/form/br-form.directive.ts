// form-control.directive.ts
import { Directive, inject, OnInit } from '@angular/core';
import { FormItem } from './form-item';
import { BrIdentifiableFormControl } from './identifiable-form-control';

@Directive({
  selector: '[brFormControl]',
  standalone: true,
  host: {
    '[attr.aria-invalid]': '_formItem.hasError()',
    '[attr.aria-describedby]': '_formItem._ariaDescribedBy()',
    '[class.border-danger]': '_formItem.hasError()',
    '[class.border-solid-md]': '_formItem.hasError()',
  },
})
export class FormControlDirective implements OnInit {
  protected readonly _formItem = inject(FormItem, { host: true });

  private readonly hostControl = inject(BrIdentifiableFormControl, {
    self: true,
    optional: true,
  });

  ngOnInit(): void {
    if (this.hostControl) {
      const generatedId = this._formItem._fieldId();
      this.hostControl.setId(generatedId);
    }
  }
}
