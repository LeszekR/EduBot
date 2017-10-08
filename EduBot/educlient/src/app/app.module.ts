import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions, RequestMethod, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

//Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services
import { HttpService } from './services/http.service';
import { TestService } from './services/test.service';

// Log in -------------------------------------------------------------------------------------
import { FormFieldComponent } from './elements/form-field.component'
import { LoginComponent } from './log-in/login.component'
import { LoginService } from './log-in/login.service'
// --------------------------------------------------------------------------------------------

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}


@NgModule({
  declarations: [
    AppComponent,
    FormFieldComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [
    LoginService,
    TestService, 
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
