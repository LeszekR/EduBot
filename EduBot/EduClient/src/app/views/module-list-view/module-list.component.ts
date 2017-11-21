import { Component, OnInit, ViewChild } from '@angular/core';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';


// ==================================================================================================================
@Component({
  selector: 'module-list-view',
  templateUrl: './module-list.component.html'
})
export class ModuleListComponent implements OnInit {

  modules: Module[];


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(private moduleService: ModuleService, private context: ContextService) { }


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {
    this.getModules();
  }


  // PRIVATE
  // ==============================================================================================================
  private getModules() {
    // this.modules = this.moduleService.getSimpleModulesMock();
    this.modules = this.moduleService.getSimpleModules();
  }

  // --------------------------------------------------------------------------------------------------------------
  private addModule() {
    // this.modules.push(new Module());
    this.moduleService.saveModule(new Module()).subscribe(res => this.modules.push(res));
  }

  // --------------------------------------------------------------------------------------------------------------
  private editModule(id: number) {
    this.context.editModuleId = id;
  }
}
