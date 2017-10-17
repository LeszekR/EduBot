import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';

//Components
import { MaterialViewComponent } from './content-view/content-view.component';
import { ExamplesViewComponent } from './example-view/example-view.component';


// ==================================================================================================================
@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html'
})
export class GameViewComponent implements OnInit {

  @ViewChild(MaterialViewComponent)
  private contentComponent: MaterialViewComponent;
  @ViewChild(ExamplesViewComponent)
  private exampleComponent: ExamplesViewComponent;

  module: Module;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(private route: ActivatedRoute, private moduleService: ModuleService, private context: ContextService) { }


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {
    this.route.data
      .subscribe((data: { module: any }) => {
        this.module = data.module;
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
    this.module.content = this.contentComponent.content;
    this.module.example = this.exampleComponent.example;
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