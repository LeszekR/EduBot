import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleResolver } from '../../resolvers/module.resolver';
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
        private route: ActivatedRoute,
        // private resolver: ModuleResolver
    ) { }


    // ON-NG-INIT
    // ==============================================================================================================
    ngOnInit() {
        this.getModules();
        this.moduleService.moduleAdded
            .subscribe((m: Module) => {
                let index = this.modules.findIndex(x => x.id == m.id);
                this.modules[index] = m;
            });
    }


    // PUBLIC
    // ==============================================================================================================
    explain() {
        let currentModule = this.context.currentModule;
        let currentModuleId = currentModule.id;
        this.moduleService.explainModule(currentModuleId)
            .subscribe(newModules => {
                let newId = this.insertNewModules(newModules, currentModule);
                this.router.navigate['module/' + newId];
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    public getModules() {
        if (this.context.isEditMode)
            this.moduleService.getSimpleModules()
                .subscribe(newModules => {
                    this.modules = newModules;
                    this.modules.forEach(m => m.isSelected = false);
                });
        else
            this.moduleService.getSimpleModulesOfUser()
                .subscribe(newModules => {
                    this.modules = newModules;
                    this.modules.forEach(m => m.isSelected = false);
                });
    }

    // --------------------------------------------------------------------------------------------------------------
    public clearModules() {
        this.modules = [];
    }


    // PRIVATE
    // ==============================================================================================================
    private insertNewModules(newModules: Module[], currentModule: Module): number {
        let index = this.modules.indexOf(currentModule);
        let tail;
        if (index < this.modules.length - 1)
            tail = this.modules.splice(index + 1);
        this.modules.concat(newModules);
        this.modules.concat(tail);
        return newModules[newModules.length - 1].id;
    }

    // --------------------------------------------------------------------------------------------------------------
    private explanationExists(): boolean {
        let currentModule = this.context.currentModule;
        if (currentModule == null)
            return false;
        return currentModule.difficulty != 'easy';
    }

    // --------------------------------------------------------------------------------------------------------------
    private prevModule() {
        // jeśli jeszcze nie zaznaczono żadnego modułu to serwer otrzymawszy currModuleId = -1
        // zareaguje tak samo jak na żądanie nowego modułu - kolejnego, który jeszcze nie był oglądany
        let currModuleId = this.context.currentModule.id;
        if (currModuleId == undefined) currModuleId = -1;

        this.moduleService.prevModule(currModuleId)
            .subscribe(newModule => {
                if (newModule != undefined && newModule != null) {
                    this.router.navigate(['module/' + newModule.id]);
                }
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private nextModule() {
        // jeśli jeszcze nie zaznaczono żadnego modułu to serwer otrzymawszy currModuleId = -1
        // zareaguje tak samo jak na żądanie nowego modułu - kolejnego, który jeszcze nie był oglądany
        let currModuleId = this.context.currentModule.id;
        if (currModuleId == undefined) currModuleId = -1;

        this.moduleService.nextModule(currModuleId)
            .subscribe(newModule => {
                if (newModule != undefined && newModule != null) {
                    if (this.modules.filter(m => { return m.id == newModule.id; }).length == 0)
                        this.modules[this.modules.length] = newModule;
                    this.router.navigate(['module/' + newModule.id]);
                }
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private addModule() {
        if (this.modules.every(m => !m.isSelected))
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
                moduleGroup.forEach(m => { m.isSelected = false; m.group_id = res.id })
                let idx = this.modules.indexOf(moduleGroup[0]);
                this.modules.splice(idx, 0, res);
                this.router.navigate(['module', res.id], { relativeTo: this.route });
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



    // MOCK
    // ==============================================================================================================
    // TODO: usunąc po testach
    private mockAddMetaModule(): void {

        let group: Module[] = [];

        let moduleIds: number[] = [47, 39];

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
