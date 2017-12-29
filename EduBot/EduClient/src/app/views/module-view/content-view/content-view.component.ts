import { Component, Input } from '@angular/core';

import { Module } from '../../../models/module'

// ==================================================================================================================
@Component({
  selector: 'content-view',
  templateUrl: './content-view.component.html',
  styles: [
    `
      fieldset{
        border-bottom-right-radius: 0px !important;
        border-top-right-radius: 0px !important;
      }
    `
  ]
})
export class ContentViewComponent {
  @Input() readonly: boolean;
  @Input() module: Module;
}