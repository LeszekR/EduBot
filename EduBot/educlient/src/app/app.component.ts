import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContextService } from './services/context.service';
import { ModuleService } from './services/module.service';
import { EmoService } from './services/emo.service';
import { MessageService } from './shared/components/message/message.service';
import { ModuleListComponent } from './views/module-list-view/module-list.component'


// MOCK *******************************************
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
// *******************************************


// ==================================================================================================================
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('loginModal')
  loginModal: ModalDirective;

  @ViewChild(ModuleListComponent)
  moduleListComponent: ModuleListComponent;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private context: ContextService,
    private http: HttpService,
    private moduleService: ModuleService,
    private emoService: EmoService,
    private messageService: MessageService,
    private loginService: LoginService) {

    // start of the pic-taking loop
    // TODO odblokować po testach
    // this.emoService.start();
  }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    // TODO - usunąc (MOCK)
    // this.mockPausePix();
  }

  // --------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.emoService.stop();
  }


  // MOCK
  // ==============================================================================================================
  private mockSendPic() {
    this.emoService.mockSendPic();    
  }
  // --------------------------------------------------------------------------------------------------------------
  private mockPausePix() {
    let that = this;
    setInterval(function () { that.pausePix(); }, 15000);
  }
  // --------------------------------------------------------------------------------------------------------------
  setEmoState(state: number) {
    if (state != undefined)
      this.http.post<string>('http://localhost:64365/api/emoservice/setemostate', state)
        .subscribe(res => {
          if (state == 2)
            this.moduleListComponent.clearModules();
          console.log(res)
        });
  }


  // PUBLIC
  // ==============================================================================================================
  openLoginWindow() {
    this.loginModal.show();
  }


  // PRIVATE
  // ==============================================================================================================
  private pausePix() {

    if (!this.emoService.alive)
      return;

    this.emoService.stop();

    this.messageService
      .info('learn.keep-working', 'common.empty')
      .then(confirmed => {
        if (confirmed)

          this.emoService.start();
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  toggleEditMode() {
    // if (this.context.isEditMode)
      // this.moduleService.CreateModuleSequence();
    this.context.isEditMode = !this.context.isEditMode;
    this.moduleListComponent.getModules();
  }
}
