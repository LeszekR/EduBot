import { Component, Input } from '@angular/core';

@Component({
  selector: 'examples-view',
  templateUrl: './examples-view.component.html'
})
export class ExamplesViewComponent {
  @Input() example: string;
}