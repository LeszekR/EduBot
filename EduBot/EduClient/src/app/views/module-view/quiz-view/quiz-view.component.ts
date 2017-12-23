import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/closed-question';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['quiz-view.component.css']
})
export class QuizViewComponent {

  @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;

  constructor(){}

  
  // CONSTRUCTOR
  // ==============================================================================================================


  // PUBLIC
  // ==============================================================================================================


  // PRIVATE
  // ==============================================================================================================
  private addQuestion(){
    let question = new ClosedQuestion();
    question.question = "Nowe pytnie";
    this.questions.push(question);
  }

  private updateQuestion(question: ClosedQuestion, idx: number){
    this.questions[idx] = question;
  }


}