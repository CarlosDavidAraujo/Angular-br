import { Component } from '@angular/core';
import {
  NgpTabset,
  NgpTabList,
  NgpTabButton,
  NgpTabPanel,
} from 'ng-primitives/tabs';

@Component({
  selector: 'br-tabs',
  imports: [NgpTabset, NgpTabList, NgpTabButton, NgpTabPanel],
  templateUrl: './br-tabs.html',
  styleUrl: './br-tabs.css',
})
export class BrTabs {}
