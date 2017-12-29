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

    modules: Module[] = [];
    selectedModuleId: number;
    anyModulesSelected: boolean;


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
    // // TODO: usunąc po testach
    // private mockAddMetaModule(): void {

    //     let group: Module[] = [];

    //     let moduleIds: number[] = [47, 39];

    //     let modules = this.modules;
    //     let modServ: ModuleService = this.moduleService;
    //     var callback = function (moduleGroup: Module[]) {
    //         modServ.saveMetaModule(moduleGroup).subscribe(res => modules.push(res));
    //     }

    //     for (var i in moduleIds)
    //         this.moduleService.getModuleById(moduleIds[i]).subscribe(m => {
    //             group[group.length] = m;
    //             if (group.length == moduleIds.length)
    //                 callback(group);
    //         });
    // }


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
    getModules() {
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
    clearModules() {
        this.modules = [];
        this.context.isEditMode = false;
        this.getModules();
        this.router.navigate(['']);
    }

    // --------------------------------------------------------------------------------------------------------------
    deleteModuleConfirm() {
        if (this.selectedModuleId != null) {
            this.messageService
                .confirm('edit.del_module_decision', 'edit.del_module_title')
                .then(confirmed => { if (confirmed) this.deleteModule(); });
        }
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
        let findDifficulty = currentModule.difficulty == 'hard' ? 'medium' : 'easy';

        let newMod = this.modules;

        // znalezienie ostatniego dziecka, które już zostało wyświetlone
        do {
            if (index == newMod.length - 1)
                break;
            index++;
        }
        while (newMod[index].difficulty == findDifficulty)


        let tail = null;
        if (index < newMod.length - 1)
            tail = newMod.splice(index);

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

        let currModule = this.context.currentModule;

        // blokada następnego modułu dopóki użytkownik nie odpowie na wszystkie pytania testu
        if (currModule != undefined)
            if (!this.context.moduleViewComponent.hasAllAnswers('learn.test-before-next'))
                return;


        // jeśli jeszcze nie zaznaczono żadnego modułu to serwer otrzymawszy currModuleId = -1
        // zareaguje tak samo jak na żądanie nowego modułu - kolejnego, który jeszcze nie był oglądany
        let currModuleId = currModule == undefined ? -1 : currModule.id;


        this.eduService.nextModule(currModuleId)
            .subscribe(moduleDistr => {
                if (moduleDistr != undefined && moduleDistr != null) {

                    let newModule = moduleDistr.module;
                    if (this.modules != undefined && newModule != null && newModule != undefined) {
                        if (this.modules.filter(m => { return m.id == newModule.id; }).length == 0)
                            this.modules[this.modules.length] = moduleDistr.module;
                    }

                    this.showDistractorAndModule(moduleDistr);
                }
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private showDistractorAndModule(moduleDistr: ModulDistracDTO) {

        // TODO: wyświetlić otrzymany dystraktor użytkownikowi
        if (moduleDistr.distractor != null)
            this.distractorService.show(moduleDistr.distractor);

        let module = moduleDistr.module;
        if (module != undefined && module != null)
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
    private addMetaModule() {
        let selectedModules = this.modules.filter(m => m.isSelected == true);
        this.moduleService.saveMetaModule(selectedModules)
            .subscribe(newModules => {
                let newIdx = -1;
                for (let i in newModules)
                    if (newModules[i].id > newIdx)
                        newIdx = newModules[i].id;

                this.modules = newModules;
                this.router.navigate([newIdx]);
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private deleteModule() {
        this.moduleService.deleteModule(this.selectedModuleId)
            .subscribe(newModules => {
                this.router.navigate(['']);
                this.modules = newModules;
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    private selectModule(mod: Module) {
        mod.isSelected = !mod.isSelected;
        this.anyModulesSelected = !this.modules.every(m => m.isSelected == false);
    }
}
