import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { TestData } from './models/test-data';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('loginModal')
  loginModal: ModalDirective;

  someData: TestData;

  constructor(private testService: TestService){}

  ngOnInit(){
  }

  openLoginWindow() {
    this.loginModal.show();
  }

}
