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

  // --------------------------------------------------------------------------------------------------------------
  private addMetaModule() {
    // TODO: pobrać grupę modułów zaznaczonych przez użytkownika dla utworzenia modułu nadrzędnego
    let moduleGroup: Module[] = this.getMockModuleGroup();

    // TODO: odkomentować i wstawić nowy moduł nadrzędny - zakomentować mock, który jest poniżej
    // this.moduleService.saveMetaModule(moduleGroup).subscribe(res => this.modules.push(res));
    let mock: Module;
    this.moduleService.saveMetaModule(moduleGroup).subscribe(res => mock = res);
  }


  // MOCK
  // ==============================================================================================================
  // TODO: usunąc po testach
  private getMockModuleGroup(): Module[] {
    let group: Module[] = [];
    let moduleIds: number[] = [9, 10, 11];
    for (var i in moduleIds)
      this.moduleService.getModuleById(moduleIds[i]).subscribe(m => group[group.length] = m);

    let ready: boolean = false;

    while (!ready) {
      if (group.length == 3) {
        ready = group[0] != undefined;
        ready = ready && group[1] != undefined;
        ready = ready && group[2] != undefined;
      }
    }

    return group;
  }
}
