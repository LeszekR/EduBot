import { Component, OnInit, Input } from '@angular/core';
import { CodeTask } from '../../../models/quiz-model/code-task';
import { ModuleViewComponent } from '../module-view.component';
import { Module } from '../../../models/module';


// ==================================================================================================================
@Component({
  selector: 'code-task-view',
  templateUrl: './code-task-view.component.html',
  styleUrls: ['./code-task-view.component.css']
})
export class CodeTaskViewComponent{

  @Input() readonly: boolean;
  // @Input() codeTasks: CodeTask[];
  @Input() module: Module;


  // // CONSTRUCTOR
  // // ==============================================================================================================
  // constructor() { }

  // // --------------------------------------------------------------------------------------------------------------
  // ngOnInit() {

  //   // MOCK
  //   // this.mockCodeTask();
  // }
 

  // // // MOCK
  // // // ==============================================================================================================
  // // private mockIdx: number;
  // // private mockCodeTask() {
  // //   if (this.codeTasks == undefined)
  // //     return 0;
  // //   let y = Math.random() * this.codeTasks.length;
  // //   this.mockIdx = Math.trunc(y);
  // // }

  
  // PRIVATE
  // ==============================================================================================================
  addCodeTask() {
    if (this.module.codeTasks == undefined)
      this.module.codeTasks = [];
    this.module.codeTasks.push(new CodeTask());
  }
}
