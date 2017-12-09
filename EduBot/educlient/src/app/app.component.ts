import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContextService } from './services/context.service';


// MOCK *******************************************
import { HttpService } from './services/http.service';
// *******************************************

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
  constructor(private context: ContextService, private http: HttpService) { }


  // MOCK
  // ==============================================================================================================
  setEmoState(state: number) {
    this.http.post<string>('http://localhost:64365/api/emoservice/setemostate', state)
      .subscribe(res => console.log(res));
  }

  // PUBLIC
  // ==============================================================================================================
  ngOnInit() { }

  // --------------------------------------------------------------------------------------------------------------
  openLoginWindow() {
    this.loginModal.show();
  }
}
