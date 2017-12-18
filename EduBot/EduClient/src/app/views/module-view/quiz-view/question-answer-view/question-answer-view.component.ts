import { Component, OnInit, Input } from '@angular/core';

import { QuestionViewComponent } from '../question-view/question-view.component'


// ==================================================================================================================
@Component({
  selector: 'question-answer-view',
  templateUrl: './question-answer-view.component.html',
  styleUrls: ['./question-answer-view.component.css']
})
export class QuestionAnswerViewComponent implements OnInit {

  @Input() answer: string;
  @Input() parentQuestion: QuestionViewComponent;
  @Input() id: number;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor() {
   }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
  }


  // PUBLIC
  // ==============================================================================================================


  // PRIVATE
  // ==============================================================================================================

}
