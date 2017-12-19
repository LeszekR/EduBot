import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/closed-question';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html'
})
export class QuizViewComponent {

  @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;

  
  // CONSTRUCTOR
  // ==============================================================================================================


  // PUBLIC
  // ==============================================================================================================


  // PRIVATE
  // ==============================================================================================================
}