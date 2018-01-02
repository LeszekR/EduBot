import { Component, OnInit, Input } from '@angular/core';
import { CodeTask } from '../../../models/quiz-model/code-task';


// ==================================================================================================================
@Component({
  selector: 'code-task-view',
  templateUrl: './code-task-view.component.html',
  styleUrls: ['./code-task-view.component.css']
})
export class CodeTaskViewComponent implements OnInit {

  @Input() readonly: boolean;
  @Input() codeTasks: CodeTask[];

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor() { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {

    // MOCK
    this.mockCodeTask();
  }


  // MOCK
  // ==============================================================================================================
  private mockIdx: number;
  private mockCodeTask() {
    if (this.codeTasks == undefined)
      return 0;
    let y = Math.random() * this.codeTasks.length;
    this.mockIdx = Math.trunc(y);
  }


  // PRIVATE
  // ==============================================================================================================
  private addCodeTask() {
    if (this.codeTasks == undefined)
      this.codeTasks = [];
    this.codeTasks.push(new CodeTask());
  }
}
