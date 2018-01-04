import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ClosedQuestion } from '../../../../models/quiz-model/closed-question'
import { TestResult } from '../../../../models/quiz-model/enum-test-result'
import { MessageService } from '../../../../shared/components/message/message.service';
import { ContextService } from '../../../../services/context.service'


// ==================================================================================================================
@Component({
  selector: 'question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  @Input() questionData: ClosedQuestion;
  @Input() editMode: boolean;
  @Output() onUpdateQuestion = new EventEmitter<ClosedQuestion>();

  editQuestionText: boolean;
  editedAnswerIdx: number;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private messageService: MessageService,
    private context: ContextService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    if (!this.questionData.question) {
      this.editQuestionText = true;
      this.questionData.correct_idx = -1;
    }
  }


  // PRIVATE
  // ==============================================================================================================
  private addAnswerToQuestion() {
    let idx = this.questionData.answers.push("");
    this.editedAnswerIdx = idx - 1;
  }

  // --------------------------------------------------------------------------------------------------------------
  private updateQuestionValue(value: string) {
    this.questionData.question = value;
    this.editQuestionText = false;
  }

  // --------------------------------------------------------------------------------------------------------------
  private updateAnswerValue(value: string) {
    this.questionData.answers[this.editedAnswerIdx] = value;
    this.editedAnswerIdx = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  private deleteAnswer(idx: number) {
    this.messageService
      .confirm('edit.del_answer_decision', 'edit.del_answer_title')
      .then(confirmed => {
        if (confirmed) {
          this.questionData.answers.splice(idx, 1);
        }
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  private deleteQuestion() {
    this.messageService
      .confirm('edit.del_question_decision', 'edit.del_question_title')
      .then(confirmed => { if (confirmed) this.onUpdateQuestion.emit(null); });
  }

  // --------------------------------------------------------------------------------------------------------------
  private markCorrectResult(): string {
    if (this.questionData.status == TestResult.Correct)
      return "fa fa-check fa-3x";
    else if (this.questionData.status == TestResult.Incorrect)
      return "fa fa-times fa-3x";
    return "";
  }
}