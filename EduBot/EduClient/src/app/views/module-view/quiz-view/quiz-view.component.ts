import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/closed-question';
import { ContextService } from '../../../services/context.service';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['quiz-view.component.css']
})
export class QuizViewComponent {

  @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;

  constructor(private context: ContextService){}

  
  // CONSTRUCTOR
  // ==============================================================================================================


  // PUBLIC
  // ==============================================================================================================


  // PRIVATE
  // ==============================================================================================================
  private addQuestion(){

  }

  private addAnswer(){

  }
}