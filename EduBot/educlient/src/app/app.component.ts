import { Component, OnInit, ViewChild } from '@angular/core';

import { TestData } from './models/test-data';
import { TestService } from './services/test.service';

// Log in 
// -------------------------------------------------------------------------------------
import { LoginComponent } from './log-in/login.component' 
// -------------------------------------------------------------------------------------

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginComponent]
})
export class AppComponent implements OnInit {

  someData: TestData;

  constructor(private testService: TestService){}

  ngOnInit(){
    this.someData = new TestData();
    this.someData.name = "Imie";
    this.someData.surname = "Nazwisko";
  }

  private testGet(){
    this.testService.getGet().subscribe();
  }

  private testPost(){
    this.testService.testPost(this.someData).subscribe();
  }

}
