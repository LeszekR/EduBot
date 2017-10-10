import { Component, OnInit, ViewChild } from '@angular/core';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html'
})
export class ModuleListComponent implements OnInit {

  modules: Module[];

  constructor(private moduleService: ModuleService){}

  ngOnInit(){
    this.getModules();
  }

  private getModules(){
    this.modules = this.moduleService.getSimpleModulesMock();
  }

}
