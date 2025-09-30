import { Component } from '@angular/core';
import { NgpDescription } from 'ng-primitives/form-field';

@Component({
  selector: 'br-form-description',
  standalone: true,
  imports: [NgpDescription],
  template: `
    <p ngpDescription>
      <ng-content></ng-content>
    </p>
  `,
})
export class BrFormDescriptionComponent {}
