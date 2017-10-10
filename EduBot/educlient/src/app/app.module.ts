import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions, RequestMethod, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { FormFieldComponent } from './elements/form-field.component'
import { LoginComponent } from './log-in/login.component'

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome-comp/welcome.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { QuizViewComponent } from './components/game-view/quiz-view/quiz-view.component';
import { ResultViewComponent } from './components/game-view/result-view/result-view.component';
import { ExamplesViewComponent } from './components/game-view/examples-view/examples-view.component';
import { MaterialViewComponent } from './components/game-view/material-view/material-view.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { GameProgressComponent } from './components/game-progress/game-progress.component';

//Services
import { TestService } from './services/test.service';
import { HttpService } from './services/http.service';
import { LoginService } from './log-in/login.service'
import { ModuleService } from './services/module.service';


import { AppRoutingModule } from './app-routing.module';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}

@NgModule({
  declarations: [
    AppComponent,
	FormFieldComponent,
    LoginComponent,
    WelcomeComponent,
    GameViewComponent,
    QuizViewComponent,
    ResultViewComponent,
    MaterialViewComponent,
    ExamplesViewComponent,
    ModuleListComponent,
    GameProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    TestService,
	LoginService,
    ModuleService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
