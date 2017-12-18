import { Component, OnInit, Input } from '@angular/core';

import { ClosedQuestion } from '../../../../models/closed-question'

// ==================================================================================================================
@Component({
  selector: 'question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  @Input() questionData: ClosedQuestion;
  public answerIdx: number;

  // TODO: usunąć po testach ***************************
  private tx: string;
  // ***************************************************


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor() { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    // TODO: usunąć po testach ***************************
      this.tx = this.questionData.question;
    // ***************************************************
  }

  // PUBLIC
  // ==============================================================================================================

  // PRIVATE
  // ==============================================================================================================

}


