import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/quiz-model/closed-question';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['quiz-view.component.css']
})
export class QuizViewComponent {

  @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;


  // PUBLIC
  // ==============================================================================================================
  private addQuestion() {
    this.questions.push(new ClosedQuestion());
  }

  // --------------------------------------------------------------------------------------------------------------
  private updateQuestion(question: ClosedQuestion, idx: number) {
    if (question)
      this.questions[idx] = question;
    else
      this.questions.splice(idx, 1);
  }
}