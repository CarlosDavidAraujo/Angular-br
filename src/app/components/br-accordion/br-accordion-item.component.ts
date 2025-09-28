import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  NgpAccordionContent,
  NgpAccordionItem,
  NgpAccordionTrigger,
} from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';

@Component({
  selector: 'app-accordion-item',
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: [
        'ngpAccordionItemValue:value',
        'ngpAccordionItemDisabled:disabled',
      ],
    },
  ],
  imports: [NgpAccordionContent, NgpAccordionTrigger, NgpButton],
  template: `
    <div class="item" [attr.active]="open()">
      <button
        #trigger
        class="header"
        [disabled]="disabled()"
        type="button"
        ngpAccordionTrigger
        ngpButton
      >
        <span class="icon"><i class="fas fa-angle-up"></i></span>
        <span class="title"> {{ heading() }}</span>
      </button>
    </div>

    <div class="content overflow-hidden p-0" ngpAccordionContent>
      <div class="pl-8x pr-2x py-base">
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './br-accordion-item.css',
})
export class BrAccordionItemComponent {
  readonly heading = input.required<string>();
  readonly disabled = input(false);

  private readonly item = inject(NgpAccordionItem, { self: true });

  readonly open = computed(() => this.item.open());
}
