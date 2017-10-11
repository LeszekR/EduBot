import { Component, OnInit, ViewChild } from '@angular/core';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html'
})
export class ModuleListComponent implements OnInit {

  modules: Module[];

  constructor(private moduleService: ModuleService, private context: ContextService){}

  ngOnInit(){
    this.getModules();
  }

  private getModules(){
    this.modules = this.moduleService.getSimpleModulesMock();
  }

  private addModule(){
    let module = new Module();
    module.isNew = true;
    this.moduleService.saveModule(module).subscribe(res => this.modules.push(res));
  }

}
