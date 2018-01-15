import { Component } from '@angular/core';

@Component({
  selector: 'welcome-comp',
  templateUrl: './welcome.component.html',
  styleUrls: ['welcome.component.css']
})
export class WelcomeComponent {
  	private activeTab = 1;
}