import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

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
    this.moduleService.moduleAdded
    .subscribe(
      (m: Module) => {
        let index = this.modules.findIndex(x => x.id == m.id);
        this.modules[index] = m;
      }
    );
  }


  // PRIVATE
  // ==============================================================================================================
  private getModules() {
    this.moduleService.getSimpleModules().subscribe(newModules => this.modules = newModules);
  }

  // --------------------------------------------------------------------------------------------------------------
  private addModule() {
    this.moduleService.saveModule(new Module()).subscribe(res => this.modules.push(res));
  }

  // --------------------------------------------------------------------------------------------------------------
  private editModule(id: number) {
    this.context.editModuleId = id;
  }
}
