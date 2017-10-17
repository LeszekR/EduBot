import { Component, Input } from '@angular/core';

// ==================================================================================================================
@Component({
  selector: 'example-view',
  templateUrl: './example-view.component.html'
})
export class ExamplesViewComponent {
  @Input() example: string;
  @Input() readonly: boolean;
}