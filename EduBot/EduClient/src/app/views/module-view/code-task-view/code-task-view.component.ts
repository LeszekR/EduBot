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
  @Input() codeTask: CodeTask;

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor() { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
  }
}
