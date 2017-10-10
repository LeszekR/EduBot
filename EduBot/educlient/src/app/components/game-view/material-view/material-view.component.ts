import { Component, Input } from '@angular/core';

@Component({
  selector: 'material-view',
  templateUrl: './material-view.component.html'
})
export class MaterialViewComponent {
  @Input() material: string;
}