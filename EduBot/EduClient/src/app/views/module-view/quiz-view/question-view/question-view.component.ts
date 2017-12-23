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
  @Input() editMode: boolean;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor() { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.questionData.correct_idx = -1;
  }

  // PUBLIC
  // ==============================================================================================================

  // PRIVATE
  // ==============================================================================================================

}


