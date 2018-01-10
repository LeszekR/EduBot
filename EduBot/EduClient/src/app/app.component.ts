import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContextService } from './services/context.service';
import { EmoService } from './services/emo.service';
import { MessageService } from './shared/components/message/message.service';
import { ModuleListComponent } from './views/module-list-view/module-list.component';

import { EduService } from './services/edu.service';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';

// ==================================================================================================================
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('loginModal')
  loginModal: ModalDirective;

  @ViewChild(ModuleListComponent)
  moduleListComponent: ModuleListComponent;

  sessionTimeout: number;
  sessionTimeoutId: any;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private context: ContextService,
    private http: HttpService,
    private emoService: EmoService,
    private messageService: MessageService,
    private eduService: EduService,
    private loginService: LoginService
  ) {

    this.initializeTimer();

    // start of the pic-taking loop
    this.emoService.start();
  }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.context.appComponent = this;
    // TODO - usunąc (MOCK)
    // this.mockPausePix();
  }

  // --------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.emoService.stop();
    this.clearTimer();
  }


  // PRIVATE
  // ==============================================================================================================
  private sendPic() {
    this.emoService.sendPic();
  }
  // --------------------------------------------------------------------------------------------------------------
  setEmoState(state: number) {
    if (state != undefined)
      this.http.post<string>('http://localhost:64365/api/emoservice/setemostate', state)
        .subscribe(res => {
          if (state == 2)
            this.moduleListComponent.clearModules();
          console.log(res);
        });
  }


  // PUBLIC
  // ==============================================================================================================
  showGameScore() {
    this.eduService.getScore()
      .subscribe(score => this.context.gameScore = score);
  }

  // --------------------------------------------------------------------------------------------------------------
  openLoginWindow() {
    this.loginModal.show();
  }


  // PRIVATE
  // ==============================================================================================================
  private initializeTimer() {
    this.sessionTimeout = 300 * 1000; //300sec
    if (this.sessionTimeout > 0)
      this.startTimer();
  }

  // --------------------------------------------------------------------------------------------------------------
  private startTimer() {
    this.sessionTimeoutId = window.setTimeout(x => this.pausePix(), this.sessionTimeout);
  }

  // --------------------------------------------------------------------------------------------------------------
  private clearTimer() {
    if (this.sessionTimeoutId) {
      window.clearTimeout(this.sessionTimeoutId);
      this.sessionTimeoutId = null;
    }
  }

  // --------------------------------------------------------------------------------------------------------------
  @HostListener('document:mousemove.out-zone', [])
  private resetTimer(e: any) {
    if (this.sessionTimeoutId) {
      this.clearTimer();
      this.startTimer();
    }
  }

  // --------------------------------------------------------------------------------------------------------------
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
    this.context.isEditMode = !this.context.isEditMode;
    this.moduleListComponent.getModules();
  }
}
