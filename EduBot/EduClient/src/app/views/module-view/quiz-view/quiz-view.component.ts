import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/quiz-model/closed-question';
import { ModuleViewComponent } from '../module-view.component';
import { Module } from '../../../models/module';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['quiz-view.component.css']
})
export class QuizViewComponent {

  // @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;
  @Input() module: Module;


  // PRIVATE
  // ==============================================================================================================
  addQuestion() {
    if (this.module.questions == undefined)
      this.module.questions = [];
    this.module.questions.push(new ClosedQuestion());
  }

  // --------------------------------------------------------------------------------------------------------------
  private updateQuestion(question: ClosedQuestion, idx: number) {
    if (question)
      this.module.questions[idx] = question;
    else
      this.module.questions.splice(idx, 1);
  }
}