import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { TestType } from '../../models/enum-test-type';
import { DiffLevel } from '../../models/enum-diff-level';
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';

//Components
import { ContentViewComponent } from './content-view/content-view.component';
import { ExampleViewComponent } from './example-view/example-view.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

import { MockData } from '../../mock/test-data'
import { ClosedQuestion } from '../../models/closed-question';


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


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.module = data.module;

      let questions = this.moduleService.UnpackClosedQuestions(this.module.test_question);

      // TODO: mock, usunąć ***************************
      // if (questions == undefined || '') questions = new MockData().mockQuestions;
      // **********************************************

      this.questions = questions;

      // TODO: mock, usunąć ***************************
      this.tx = '';
      for (var i in questions) {
        this.tx += questions[i].question + '\n';
        for (var j in questions[i].answers)
          this.tx += '  - ' + questions[i].answers[j] + '\n';
        this.tx += '\n\n';
      }
      // **********************************************

      this.viewType = this.CONTENT_VIEW;
    }
    );
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
    this.module.content = this.contentComponent.content;
    this.module.example = this.exampleComponent.example;
    this.module.test_question = this.moduleService.StringifyClosedQuestions(this.questions);

    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);
    this.moduleService.moduleAdded.emit(this.module);
    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  cancel() {
    this.context.editModuleId = null;
  }
}