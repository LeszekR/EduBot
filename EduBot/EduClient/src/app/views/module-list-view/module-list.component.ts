import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Models
import { Module } from '../../models/module';

//Services
import { ModuleResolver } from '../../resolvers/module.resolver';
import { TranslatePipe } from '../../languages/translate.pipe';

import { ModuleService } from '../../services/module.service';
import { DistractorService } from '../../services/distractor.service';
import { EduService } from '../../services/edu.service';
import { ContextService } from '../../services/context.service';
import { MessageService } from '../../shared/components/message/message.service';
import { ModulDistracDTO } from '../../models/module-and-distractor-DTO';


// ==================================================================================================================
@Component({
    selector: 'module-list-view',
    templateUrl: './module-list.component.html',
    styleUrls: ['module-list.component.css']
})
export class ModuleListComponent implements OnInit {

    modules: Module[];
    selectedModuleId: number;
    selectedModules: Module[] = [];


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private moduleService: ModuleService,
        private distractorService: DistractorService,
        private eduService: EduService,
        private context: ContextService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    // --------------------------------------------------------------------------------------------------------------
    ngOnInit() {
        this.getModules();
        this.moduleService.moduleAdded
            .subscribe((m: Module) => {
                let index = this.modules.findIndex(x => x.id == m.id);
                this.modules[index] = m;
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
        

    // PUBLIC
    // ==============================================================================================================
    explain() {
        let currentModule = this.context.currentModule;
        let currentModuleId = currentModule.id;
        this.eduService.explainModule(currentModuleId)
            .subscribe(newModules => {
                if (newModules != null) {
                    let newId = this.insertNewModules(newModules, currentModule);
                    this.router.navigate(['module/' + newId]);
                }
                else {
                    let index = this.modules.findIndex(m => m.id == currentModuleId);
                    if (this.modules.length > index + 1)
                        this.router.navigate(['module/' + this.modules[index + 1].id]);
                }
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    public getModules() {
        if (this.context.isEditMode)
            this.moduleService.getSimpleModules()
                .subscribe(newModules => {
                    this.setNewModules(newModules);
                });
        else
            this.moduleService.getSimpleModulesOfUser()
                .subscribe(newModules => {
                    this.setNewModules(newModules);
                });
    }

    // --------------------------------------------------------------------------------------------------------------
    public clearModules() {
        this.modules = [];
        this.context.isEditMode = false;
        this.getModules();
        this.router.navigate(['']);
    }


    // PRIVATE
    // ==============================================================================================================
    private setNewModules(newModules: Module[]) {
        this.modules = newModules;
        this.modules.forEach(m => m.isSelected = false);
        this.router.navigate(['module/' + this.modules[this.modules.length - 1].id]);
    }

    // --------------------------------------------------------------------------------------------------------------
    private insertNewModules(newModules: Module[], currentModule: Module): number {
        let index = this.modules.findIndex(mod => mod.id == currentModule.id);
        let newMod = this.modules;

        let tail = null;
        if (index < newMod.length - 1)
            tail = newMod.splice(index + 1);

        newMod = newMod.concat(newModules);
        if (tail != null)
            newMod = newMod.concat(tail);

        this.modules = newMod;
        return newModules[0].id;
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

        this.eduService.prevModule(currModuleId)
            .subscribe(moduleDistr => {
                if (moduleDistr != undefined && moduleDistr != null)
                    this.showDistractorAndModule(moduleDistr);
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private nextModule() {
        // jeśli jeszcze nie zaznaczono żadnego modułu to serwer otrzymawszy currModuleId = -1
        // zareaguje tak samo jak na żądanie nowego modułu - kolejnego, który jeszcze nie był oglądany
        let currModule = this.context.currentModule;
        let currModuleId = currModule == undefined ? -1 : currModule.id;

        this.eduService.nextModule(currModuleId)
            .subscribe(moduleDistr => {
                if (moduleDistr != undefined && moduleDistr != null) {

                    if (this.modules.filter(m => { return m.id == moduleDistr.module.id; }).length == 0)
                        this.modules[this.modules.length] = moduleDistr.module;

                    this.showDistractorAndModule(moduleDistr);
                }
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private showDistractorAndModule(moduleDistr: ModulDistracDTO) {

        if (moduleDistr.distractor != null)
            this.distractorService.show(moduleDistr.distractor);

            this.router.navigate(['module/' + moduleDistr.module.id]);
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
        let moduleGroup = this.selectedModules;
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
}
