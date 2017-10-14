import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';

//Components
import { MaterialViewComponent } from './material-view/material-view.component';
import { ExamplesViewComponent } from './examples-view/examples-view.component';


@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html'
})
export class GameViewComponent implements OnInit {

  @ViewChild(MaterialViewComponent)
  private materialComponent: MaterialViewComponent;
  @ViewChild(ExamplesViewComponent)
  private exampleComponent: ExamplesViewComponent;
  
  module: Module;

  constructor(private route: ActivatedRoute, private moduleService: ModuleService, private context: ContextService){}

  ngOnInit(){
      this.route.data
          .subscribe((data: { module: any }) => {
              this.module = data.module;
            });
  }

  save(){
    this.module.material = this.materialComponent.material;
    this.module.examples = this.exampleComponent.example;
    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);

    this.context.editModuleId = null;
  }

  delete(){
    console.log("delete");
    this.context.editModuleId = null;
  }

  cancel(){
    this.context.editModuleId = null;
  }

}