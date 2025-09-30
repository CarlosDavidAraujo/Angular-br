import {
  Component,
  ChangeDetectionStrategy,
  model,
  effect,
} from '@angular/core';

@Component({
  selector: 'br-modal',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  open = model<boolean>(false);
  private triggerElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (this.open()) {
        // Se o modal ABRIU e o trigger ainda não foi definido (cenário controlado),
        // nós o capturamos agora.
        if (!this.triggerElement) {
          this.triggerElement = document.activeElement as HTMLElement;
        }
      } else {
        // Se o modal FECHOU, devolvemos o foco como antes.
        if (this.triggerElement) {
          this.triggerElement.focus();
          // Limpamos a referência para a próxima abertura
          this.triggerElement = null;
        }
      }
    });
  }

  /**
   * Abre o modal. Este método é usado pela diretiva `br-modal-trigger` (cenário não controlado).
   * Ele captura o trigger de forma explícita e mais confiável no momento do clique.
   */
  openModal() {
    this.triggerElement = document.activeElement as HTMLElement;
    this.open.set(true);
  }

  /**
   * Fecha o modal.
   */
  closeModal() {
    this.open.set(false);
  }
}
