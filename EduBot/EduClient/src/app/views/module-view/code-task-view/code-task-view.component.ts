import { Component, OnInit, Input } from '@angular/core';
import { CodeTask } from '../../../models/quiz-model/code-task';
import { ModuleViewComponent } from '../module-view.component';
import { Module } from '../../../models/module';
import { MessageService } from '../../../shared/components/message/message.service';
import { ContextService } from '../../../services/context.service';


// ==================================================================================================================
@Component({
  selector: 'code-task-view',
  templateUrl: './code-task-view.component.html',
  styleUrls: ['./code-task-view.component.css']
})
export class CodeTaskViewComponent {

  @Input() readonly: boolean;
  @Input() module: Module;

  activeTab: number = 0;

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private messageService: MessageService,
    private context: ContextService) { }


  // PRIVATE
  // ==============================================================================================================
  deleteCodeTask() {
    this.messageService
      .confirm('edit.del_code_decision', 'common.empty')
      .then(confirmed => {

        let codes = this.module.codeTasks;
        let index = codes.findIndex(c => c.id == this.context.currentCodeTask.id);
        codes.splice(index, 1);
        if (codes.length == 0)
          this.module.codeTasks = undefined;

          console.log("usuwam kod")
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  addCodeTask() {
    if (this.module.codeTasks == undefined)
      this.module.codeTasks = [];
    this.module.codeTasks.push(new CodeTask());
  }
}
