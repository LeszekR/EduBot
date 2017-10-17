import { Component, Input } from '@angular/core';

// ==================================================================================================================
@Component({
  selector: 'example-view',
  templateUrl: './example-view.component.html',
  styles: ['../game-view.component.css']
})
export class ExampleViewComponent {
  @Input() example: string;
  @Input() readonly: boolean;
}