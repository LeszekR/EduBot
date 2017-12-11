import { Component, Input } from '@angular/core';

import { Module } from '../../../models/module'

// ==================================================================================================================
@Component({
  selector: 'content-view',
  templateUrl: './content-view.component.html',
  styles: ['../module-view.component.css']
})
export class ContentViewComponent {
  @Input() readonly: boolean;
  @Input() module: Module;
}