import { Component, Input } from '@angular/core';

import { Module } from '../../../models/module'

// ==================================================================================================================
@Component({
  selector: 'example-view',
  templateUrl: './example-view.component.html',
  styles: ['../module-view.component.css']
})
export class ExampleViewComponent {
  @Input() module: Module;
  @Input() readonly: boolean;
}