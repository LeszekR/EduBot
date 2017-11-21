import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions, RequestMethod, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { FormFieldComponent } from './components/form-field/form-field.component'
import { LoginComponent } from './components/log-in/login.component'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome-comp/welcome.component';
import { ModuleViewComponent } from './views/module-view/module-view.component';
import { QuizViewComponent } from './views/module-view/quiz-view/quiz-view.component';
import { ResultViewComponent } from './views/module-view/result-view/result-view.component';
import { ExampleViewComponent } from './views/module-view/example-view/example-view.component';
import { ContentViewComponent } from './views/module-view/content-view/content-view.component';
import { ModuleListComponent } from './views/module-list-view/module-list.component';
import { GameProgressComponent } from './components/game-progress/game-progress.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';

//Services
import { TestService } from './mock/test.service';
import { HttpService } from './services/http.service';
import { LoginService } from './services/login.service'
import { ModuleService } from './services/module.service';
import { ContextService } from './services/context.service';
import { TranslateService, TRANSLATION_PROVIDERS } from './languages';
import { TranslatePipe } from './languages/translate.pipe';

//Modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}


// ==================================================================================================================
@NgModule({
  declarations: [
    TranslatePipe,
    AppComponent,
    FormFieldComponent,
    LoginComponent,
    WelcomeComponent,
    ToolbarComponent,
    ModuleViewComponent,
    QuizViewComponent,
    ResultViewComponent,
    ContentViewComponent,
    ExampleViewComponent,
    ModuleListComponent,
    GameProgressComponent,
    SelectLanguageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
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
    ContextService,
    TranslateService,
    TRANSLATION_PROVIDERS,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    },
    { provide: LOCALE_ID, useValue: navigator.language }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
