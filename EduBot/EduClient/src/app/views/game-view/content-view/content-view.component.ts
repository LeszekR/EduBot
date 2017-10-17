import { Component, Input } from '@angular/core';

// ==================================================================================================================
@Component({
  selector: 'content-view',
  templateUrl: './content-view.component.html',
  styles: ['../game-view.component.css']
})
export class ContentViewComponent {
  @Input() content: string;
  @Input() readonly: boolean;
}