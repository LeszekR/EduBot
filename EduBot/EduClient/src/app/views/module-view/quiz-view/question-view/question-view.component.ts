import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ClosedQuestion } from '../../../../models/closed-question'
import { MessageService } from '../../../../shared/components/message/message.service';

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
  constructor(private messageService: MessageService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.questionData.correct_idx = -1;
  }

  // PUBLIC
  // ==============================================================================================================

  // PRIVATE
  // ==============================================================================================================

  private addAnswerToQuestion(){
    this.questionData.answers.push("Nowa odpowiedź");
    this.updateSource();
  }

  private updateQuestionValue(value: string){
    this.questionData.question = value;
    this.editQuestionText = false;
    this.updateSource();
  }

  private updateAnswerValue(value: string){
    this.questionData.answers[this.editedAnswerIdx] = value;
    this.editedAnswerIdx = null;
    this.updateSource();
  }

  private deleteAnswer(idx: number){
    this.messageService
      .confirm('edit.del_answer_decision', 'edit.del_answer_title')
      .then(confirmed => { 
        if (confirmed){
            this.questionData.answers.splice(idx,1);
            this.updateSource();
        } 
      });
  }

  private deleteQuestion(){
    this.messageService
      .confirm('edit.del_question_decision', 'edit.del_question_title')
      .then(confirmed => { if (confirmed) this.onUpdateQuestion.emit(null); });
  }

  private updateSource(){
    this.onUpdateQuestion.emit(this.questionData);
  }
}


