import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';
import { MessageService } from '../../shared/components/message/message.service';
import { TranslatePipe } from '../../languages/translate.pipe';


// ==================================================================================================================
@Component({
    selector: 'module-list-view',
    templateUrl: './module-list.component.html',
    styleUrls: ['module-list.component.css']
})
export class ModuleListComponent implements OnInit {

    modules: Module[];
    selectedModuleId: number;
    selectedModuleIds: number[];

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private moduleService: ModuleService,
        private context: ContextService,
        private messageService: MessageService,
        private router: Router
    ) { }


    // PUBLIC
    // ==============================================================================================================
    ngOnInit() {
        this.selectedModuleIds = new Array();
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
        this.moduleService.getSimpleModules()
            .subscribe(newModules => { 
                this.modules = newModules;
                this.modules.forEach( m => m.isSelected = false );
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private addModule() {
        this.moduleService.saveModule(new Module()).subscribe(res => this.modules.push(res));
    }

    // --------------------------------------------------------------------------------------------------------------
    private editModule() {
        this.context.editModuleId = this.selectedModuleId;
    }

    // --------------------------------------------------------------------------------------------------------------
    private addMetaModule() {
        // TODO: pobrać grupę modułów zaznaczonych przez użytkownika dla utworzenia modułu nadrzędnego
        // let moduleGroup: Module[] = ...
        // moduleService.saveMetaModule(moduleGroup).subscribe(res => modules.push(res));

        // TODO: usunąć mock 
        this.mockAddMetaModule();
    }

    // --------------------------------------------------------------------------------------------------------------
    private deleteModule() {

        // TODO: dodać do projektu msgbox z opcją 'Yes-No' i wykorzystać tu dla decyzji użytkownika        
        // let continue: boolean = this.messageService.question(
        //     'edit.del_module_title' , 'edit.del_module_decision');
        // if (!continue) return;

        this.moduleService.deleteModule(this.selectedModuleId)
            .subscribe(newModules => {
                this.context.editModuleId = null;
                this.router.navigate(['']);
                this.modules = newModules;
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private nextModule() {
        this.moduleService.nextModule()
            .subscribe(res => console.log(res));
    }


    // MOCK
    // ==============================================================================================================
    // TODO: usunąc po testach
    private mockAddMetaModule(): void {

        let group: Module[] = [];

        let moduleIds: number[] = [13,20];

        let modules = this.modules;
        let modServ: ModuleService = this.moduleService;
        var callback = function (moduleGroup: Module[]) {
            modServ.saveMetaModule(moduleGroup).subscribe(res => modules.push(res));
        }

        for (var i in moduleIds)
            this.moduleService.getModuleById(moduleIds[i]).subscribe(m => {
                group[group.length] = m;
                if (group.length == moduleIds.length)
                    callback(group);
            });
    }
}

// function delay(ms: number) {
//     return new Promise<void>(function (resolve) {
//         setTimeout(resolve, ms);
//     });
// }
