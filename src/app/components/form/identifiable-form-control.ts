import { signal } from '@angular/core';

export abstract class BrIdentifiableFormControl {
  protected readonly _id = signal<string | null>(null);

  public readonly id = this._id.asReadonly();

  abstract setId(id: string): void;
}
