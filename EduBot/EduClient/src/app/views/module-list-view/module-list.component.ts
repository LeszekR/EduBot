import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private moduleService: ModuleService,
        private context: ContextService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    // PUBLIC
    // ==============================================================================================================
    ngOnInit() {
        this.getModules();
        this.moduleService.moduleAdded
            .subscribe((m: Module) => {
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
        if(this.modules.every(m => !m.isSelected))
            this.moduleService.saveModule(new Module()).subscribe(res => this.modules.push(res));
        else
            this.addMetaModule();
    }

    // --------------------------------------------------------------------------------------------------------------
    private editModule() {
        this.context.editModuleId = this.selectedModuleId;
    }

    // --------------------------------------------------------------------------------------------------------------
    private addMetaModule() {
        // TODO: pobrać grupę modułów zaznaczonych przez użytkownika dla utworzenia modułu nadrzędnego
        let moduleGroup = this.modules.filter(m => m.isSelected);
        this.moduleService.saveMetaModule(moduleGroup)
            .subscribe(res => {
                moduleGroup.forEach(m => { m.isSelected = false; m.id_group = res.id })
                let idx = this.modules.indexOf(moduleGroup[0]);
                this.modules.splice(idx, 0, res);
                this.router.navigate(['module', res.id], {relativeTo: this.route});
            });
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

}
