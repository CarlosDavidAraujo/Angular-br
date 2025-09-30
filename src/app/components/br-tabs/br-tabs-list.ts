import { Component } from '@angular/core';
import { NgpTabList } from 'ng-primitives/tabs';

@Component({
  selector: 'br-tabs-list',
  standalone: true,
  imports: [NgpTabList],
  template: `<nav ngpTabList class="tab-nav">
    <ul>
      <ng-content></ng-content>
    </ul>
  </nav>`,
})
export class BrTabsList {}
