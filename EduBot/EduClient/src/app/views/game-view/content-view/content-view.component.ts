import { Component, Input } from '@angular/core';

// ==================================================================================================================
@Component({
  selector: 'content-view',
  templateUrl: './content-view.component.html'
})
export class MaterialViewComponent {
  @Input() content: string;
  @Input() readonly: boolean;
}