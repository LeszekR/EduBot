import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ContextService } from './services/context.service';
import { EmoService } from './services/emo.service';
import { MessageService } from './shared/components/message/message.service';
import { ModuleListComponent } from './views/module-list-view/module-list.component';
import { LoginComponent } from './views/log-in/login.component';

import { EduService } from './services/edu.service';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service';
import { GameScore } from './models/game-score';
import { DistractorService } from './services/distractor.service';
import { Images, Distractor } from './models/distractor';
import { GameProgressComponent } from './components/game-progress/game-progress.component';

// ==================================================================================================================
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(LoginComponent)
  loginWindow: LoginComponent;

  @ViewChild(ModuleListComponent)
  moduleListComponent: ModuleListComponent;

  @ViewChild(GameProgressComponent)
  progresComponent: GameProgressComponent;

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
    private loginService: LoginService,
    private distractorService: DistractorService
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


  // PUBLIC
  // ==============================================================================================================
  showGameScore(score: GameScore, showPromotion = true) {

    if (showPromotion) {
      let rankOld = this.context.gameScore.rank;
      let lifeOld = this.context.gameScore.life;

      if (score.life == 0 && lifeOld != 0) {
        let distractor = new Distractor();
        distractor.distr_content = "death";
        this.distractorService.show(distractor);
      }
      else if (rankOld < score.rank) {
        let distractor = new Distractor();
        distractor.distr_content = "promotion_01";
        this.distractorService.show(distractor);
      }
      else if (rankOld > score.rank) {
        let distractor = new Distractor();
        distractor.distr_content = "degradation_01";
        this.distractorService.show(distractor);
      }
    }

    this.context.gameScore = score;
    this.progresComponent.fillMap();
  }

  // --------------------------------------------------------------------------------------------------------------
  refreshGameScore(showPromotion = true) {
    this.eduService.getScore()
      .subscribe(score => this.showGameScore(score, showPromotion));
  }

  // --------------------------------------------------------------------------------------------------------------
  setEmoState(state: number) {
    if (state != undefined)
      this.http.post<any>('/api/emoservice/setemostate', state)
        .subscribe(res => {

          if (state == 2) {
            this.moduleListComponent.clearModules();
            let newGameScore = new GameScore();
            newGameScore.life = 100;
            newGameScore.shield = 0;
            newGameScore.rank = 0;
            newGameScore.progress = 0;
          }
          if (state == 3 || state == 4)
            this.eduService.serverWantsToDistract(res);

          console.log(res);
        });
  }

  // --------------------------------------------------------------------------------------------------------------
  openLoginWindow() {
    this.loginWindow.show();
  }


  // PRIVATE
  // ==============================================================================================================
  private sendPic() {
    this.emoService.sendPic();
  }

  // --------------------------------------------------------------------------------------------------------------
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
