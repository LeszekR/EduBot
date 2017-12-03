import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContextService } from './services/context.service';

// ==================================================================================================================
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('loginModal')
  loginModal: ModalDirective;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(private context: ContextService) { }


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {}

  // --------------------------------------------------------------------------------------------------------------
  openLoginWindow() {
    this.loginModal.show();
  }
}
