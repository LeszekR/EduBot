import { Component} from '@angular/core';
import { SpinnerService, SpinnerMode} from './spinner.service';

@Component({
    selector: 'spinner-component',
    template: `
        <div *ngIf="mode!=0" class="spinner-background" >
          <div *ngIf="mode==1" class="loading-spinner"></div>
        </div>
    `
})
export class SpinnerComponent {
  public mode: SpinnerMode = 0;

  public constructor(spinner: SpinnerService) {
    spinner.mode.subscribe((mode: SpinnerMode) => {
        this.mode = mode;
    });
  }
}