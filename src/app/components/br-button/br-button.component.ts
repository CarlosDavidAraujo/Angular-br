// br-button.component.ts
import { booleanAttribute, Component, computed, input } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success';

@Component({
  selector: 'button[br-button]',
  standalone: true,
  hostDirectives: [{ directive: NgpButton, inputs: ['disabled'] }],
  template: ` <ng-content /> `,
  host: {
    // Agora, o host aplica as classes dinamicamente a partir do nosso signal `classes`
    '[class]': 'classes()',
  },
  // A propriedade styleUrl foi removida
})
export class BrButtonComponent {
  /** O tamanho do botão. */
  readonly size = input<ButtonSize>('medium');

  /** A variante de cor do botão. */
  readonly variant = input<ButtonVariant>('default');

  /** Transforma o botão em um círculo. */
  readonly circle = input(false, { transform: booleanAttribute });

  /**
   * Sinal computado que constrói a string de classes do Tailwind
   * com base nos inputs do componente.
   */
  readonly classes = computed(() => {
    const variant = this.variant();
    const size = this.size();
    const circle = this.circle();

    // Classes base aplicadas a todos os botões
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-semibold',
      'whitespace-nowrap',
      'transition-colors',
      'focus:outline-none',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'focus-visible:ring',
    ];

    // Classes de Variante (Cor)
    const variantClasses = {
      primary: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90'],
      secondary: [
        'bg-secondary',
        'text-secondary-foreground',
        'border',
        'border-primary',
        'hover:bg-black/5',
      ],
      danger: ['bg-danger', 'text-danger-foreground', 'hover:bg-danger/90'],
      success: ['bg-success', 'text-success-foreground', 'hover:bg-success/90'],
      default: ['bg-primary', 'text-primary-foreground', 'hover:bg-primary/90'], // Fallback
    }[variant];

    // Classes de Tamanho
    const sizeClasses = {
      xsmall: ['h-6', 'text-sm'],
      small: ['h-8', 'text-sm'],
      medium: ['h-10', 'text-base'],
      large: ['h-12', 'text-lg'],
    }[size];

    // Classes de Forma (Círculo)
    const circleClasses = circle
      ? ['rounded-full', 'aspect-square', 'p-0']
      : ['rounded-full', 'px-3x']; // `px-3x` do GOV.BR

    // Juntamos tudo em uma única string
    return [
      ...baseClasses,
      ...variantClasses,
      ...sizeClasses,
      ...circleClasses,
    ].join(' ');
  });
}
