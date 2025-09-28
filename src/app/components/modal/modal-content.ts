import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  effect,
  viewChild,
  contentChild,
  Signal,
} from '@angular/core';
import { Modal } from './modal';
import { ModalHeader } from './modal-header';
import { ModalTitle } from './modal-title';

let uniqueId = 0;

@Component({
  selector: 'br-modal-content',
  styleUrls: ['./modal-content.css'],
  template: `
    @if (modal.open()) {
    <div class="modal-root">
      <div class="modal-overlay" (click)="modal.closeModal()"></div>
      <div
        #dialog
        class="br-modal medium"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="_generatedId"
        tabindex="-1"
      >
        <ng-content></ng-content>
      </div>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey()',
    '(keydown.tab)': 'trapFocus($event)',
  },
})
export class ModalContent {
  modal = inject(Modal);

  private dialog: Signal<ElementRef<HTMLDivElement> | undefined> =
    viewChild('dialog');

  private title = contentChild(ModalTitle, { read: ElementRef });

  protected _generatedId = `br-modal-title-${uniqueId++}`;

  constructor() {
    effect(() => {
      const dialogEl = this.dialog();
      const titleEl = this.title();

      if (titleEl && !titleEl.nativeElement.id) {
        titleEl.nativeElement.id = this._generatedId;
      }

      if (this.modal.open() && dialogEl) {
        setTimeout(() => dialogEl.nativeElement.focus(), 0);
      }

      // Foca no diálogo quando ele é aberto
      if (this.modal.open() && dialogEl) {
        setTimeout(() => dialogEl.nativeElement.focus(), 0);
      }
    });
  }

  onEscapeKey(): void {
    if (this.modal.open()) this.modal.closeModal();
  }

  trapFocus(event: Event): void {
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    const dialogEl = this.dialog()?.nativeElement;

    if (!this.modal.open() || !dialogEl) return;

    const focusableElements = Array.from(
      dialogEl.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }
}
