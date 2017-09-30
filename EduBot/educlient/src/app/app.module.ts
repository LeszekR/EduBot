import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, RequestOptions, RequestMethod, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

//Components
import { AppComponent } from './app.component';
import { TestService } from './services/test.service';
import { HttpService } from './services/http.service';
import { AppRoutingModule } from './app-routing.module';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [
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
