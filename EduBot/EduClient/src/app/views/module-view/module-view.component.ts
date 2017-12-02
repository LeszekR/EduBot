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


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private context: ContextService) { }


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {
    this.route.data.subscribe(data => this.module = data.module);
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
    // this.module.id = this.context.editModuleId;
    // this.module.id_group = 0;   // TODO: pobrac z pola edycji
    // this.module.testType = "choice";   // TODO: pobrac z pola edycji

    this.module.content = this.contentComponent.content;
    this.module.example = this.exampleComponent.example;
    this.module.testTask = this.moduleService.StringifyClosedQuestions(this.quizComponent);

    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);
    this.moduleService.moduleAdded.emit(this.module);
    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  cancel() {
    this.context.editModuleId = null;
  }
}