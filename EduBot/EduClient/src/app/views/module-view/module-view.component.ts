import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

    // this.route.data.subscribe((data: { module: Module }) => {
    //   // this.module = ( data.module instanceof Module) ?  data.module : new  Module();
    //   });
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
    // TODO : pobrać wszystkie zastępcze dane z faktycznych pól edycji 

    this.module.id = this.context.editModuleId;
    this.module.id_group = 0;   // TODO: pobrac z pola edycji

    this.module.content = this.contentComponent.content;
    this.module.example = this.exampleComponent.example;

    this.module.testType = "choice";   // TODO: pobrac z pola edycji
    this.module.testTask = "próbne pytanie testowe";   // TODO: pobrac z pola edycji

    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);

    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  delete() {
    console.log("delete");
    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  cancel() {
    this.context.editModuleId = null;
  }
}