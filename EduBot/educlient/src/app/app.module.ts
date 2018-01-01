import { BrowserModule, EventManager } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions, RequestMethod, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { FormFieldComponent } from './components/form-field/form-field.component'
import { LoginComponent } from './components/log-in/login.component'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome-comp/welcome.component';
import { ModuleViewComponent } from './views/module-view/module-view.component';
import { QuizViewComponent } from './views/module-view/quiz-view/quiz-view.component';
import { CodeTaskViewComponent } from './views/module-view/code-task-view/code-task-view.component';
import { ResultViewComponent } from './views/module-view/result-view/result-view.component';
import { ExampleViewComponent } from './views/module-view/example-view/example-view.component';
import { ContentViewComponent } from './views/module-view/content-view/content-view.component';
import { ModuleListComponent } from './views/module-list-view/module-list.component';
import { GameProgressComponent } from './components/game-progress/game-progress.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { MessageComponent } from './shared/components/message/message.component';
import { QuestionViewComponent } from './views/module-view/quiz-view/question-view/question-view.component';
import { Autofocus } from './shared/directives/autofocus.directive';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

//Services
import { TestService } from './mock/test.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service'
import { LoginService } from './services/login.service'
import { ModuleService } from './services/module.service';
import { DistractorService } from './services/distractor.service';
import { TestTaskService } from './services/test.service';
import { CameraService } from './services/camera.service';
import { EmoService } from './services/emo.service';
import { EduService } from './services/edu.service';
import { ContextService } from './services/context.service';
import { TranslateService, TRANSLATION_PROVIDERS } from './languages';
import { TranslatePipe } from './languages/translate.pipe';
import { MessageService } from './shared/components/message/message.service';
import { SpinnerService } from './shared/components/spinner/spinner.service';
import { CustomEventManager } from './shared/components/costum-event-manager.service';

//Modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}


// ==================================================================================================================
@NgModule({
  declarations: [
    Autofocus,
    TranslatePipe,
    AppComponent,
    FormFieldComponent,
    LoginComponent,
    WelcomeComponent,
    ModuleViewComponent,
    QuizViewComponent,
    SpinnerComponent,
    CodeTaskViewComponent,
    ResultViewComponent,
    ContentViewComponent,
    ExampleViewComponent,
    ModuleListComponent,
    GameProgressComponent,
    SelectLanguageComponent,
    MessageComponent,
    QuestionViewComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    UserService,
    TestService,
    LoginService,
    ModuleService,
    DistractorService,
    TestTaskService,
    CameraService,
    EmoService,
    EduService,
    ContextService,
    MessageService,
    TranslateService,
    SpinnerService,
    TRANSLATION_PROVIDERS,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    },
    { provide: LOCALE_ID, useValue: navigator.language },
    { provide: EventManager, useClass: CustomEventManager }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
