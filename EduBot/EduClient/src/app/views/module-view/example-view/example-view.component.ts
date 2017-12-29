import { Component, Input } from '@angular/core';

import { Module } from '../../../models/module'

// ==================================================================================================================
@Component({
  selector: 'example-view',
  templateUrl: './example-view.component.html',
  styles: [
    `
      fieldset{
        border-bottom-left-radius: 0px !important;
        border-top-left-radius: 0px !important;
      }
    `
  ]
})
export class ExampleViewComponent {
  @Input() module: Module;
  @Input() readonly: boolean;
}