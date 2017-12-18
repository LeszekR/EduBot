import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { TestType } from '../../models/enum-test-type';
import { DiffLevel } from '../../models/enum-diff-level';
import { Module } from '../../models/module';
import { ClosedQuestAnswDTO } from '../../models/closed-question-answ-DTO';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';

//Components
import { AppComponent } from '../../app.component'
import { ContentViewComponent } from './content-view/content-view.component';
import { ExampleViewComponent } from './example-view/example-view.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

import { MockData } from '../../mock/test-data'
import { ClosedQuestion } from '../../models/closed-question';
// import { EventEmitter } from 'events';


// ==================================================================================================================
@Component({
  selector: 'module-view',
  templateUrl: './module-view.component.html',
  styles: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  @ViewChild(ContentViewComponent)
  private contentComponent: ContentViewComponent;
  @ViewChild(ExampleViewComponent)
  private exampleComponent: ExampleViewComponent;
  @ViewChild(QuizViewComponent)
  private quizComponent: QuizViewComponent;

  module: Module;
  questions: ClosedQuestion[];
  viewType: string;
  appComp: AppComponent;

  // TODO: mock, usunąć ***************************
  tx: string;
  // **********************************************

  private readonly CONTENT_VIEW = 'content';
  private readonly QUIZ_VIEW = 'quiz';
  private readonly CODE_VIEW = 'code';


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private context: ContextService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.module = data.module;
      this.context.currentModule = data.module;

      this.questions = this.moduleService.UnpackClosedQuestions(this.module.test_question);

      // TODO: mock, usunąć ***************************
      // if (this.questions.length == 0) this.questions = new MockData().mockQuestions;
      // **********************************************
      this.viewType = this.CONTENT_VIEW;
    });
  }


  // PUBLIC
  // ==============================================================================================================
  verifyClosedTest() {
    let answers: ClosedQuestAnswDTO[] = [];

    let q: ClosedQuestion;
    for (var i in this.questions) {
      q = this.questions[i];
      answers[answers.length] = new ClosedQuestAnswDTO(q.id, q.correct_idx);
    }

    this.moduleService.verifyClosedTest(answers)
      .subscribe(result => console.log(result));
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
    this.module.test_question = this.moduleService
      .StringifyClosedQuestions(this.questions, this.context.editModuleId);

    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);
    this.moduleService.moduleAdded.emit(this.module);
    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  cancel() {
    this.context.editModuleId = null;
  }
}