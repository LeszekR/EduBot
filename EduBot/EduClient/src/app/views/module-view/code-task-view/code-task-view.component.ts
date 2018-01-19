import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { CodeTaskFront } from '../../../models/code-task';
import { ModuleViewComponent } from '../module-view.component';
import { Module } from '../../../models/module';
import { TestResult } from '../../../models/enums';

import { ContextService } from '../../../services/context.service';
import { MessageService } from '../../../shared/components/message/message.service';


// ==================================================================================================================
@Component({
  selector: 'code-task-view',
  templateUrl: './code-task-view.component.html',
  styleUrls: ['./code-task-view.component.css']
})
export class CodeTaskViewComponent implements OnInit {

  @ViewChild("codeOutputDiv") codeOutputDiv: HTMLDivElement;

  @Input() readonly: boolean;
  @Input() difficulty: string;
  @Input() codeTasks: CodeTaskFront[];
  @Input() moduleId: number;
  
  private imgSrc: string;
  private imgCss: string;
  activeTab: number = 0;

  
  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private messageService: MessageService,
    private context: ContextService) { }

  
  ngOnInit(){
    let tab = this.context.activeTabs.get(this.moduleId);
    if(tab)
      this.activeTab = tab;

    setTimeout(() => {
      let editor = document.getElementById('code-editor');
      if(editor)
        editor.getElementsByTagName('textarea')[0].focus();
    },500 );

    document.onkeydown = (e: any) => {
      if (e.which == '27') 
          this.hideImage();
    }
  }

  // PRIVATE
  // ==============================================================================================================
  private setActiveTab(i: number) {
    this.activeTab = i;
    this.context.activeTabs.set(this.moduleId, this.activeTab)
    this.context.currentCodeTask = this.codeTasks[i];
    this.context.codeOutputDiv = this.codeOutputDiv;
  }
  

  // --------------------------------------------------------------------------------------------------------------
  private deleteCodeTask() {
    this.messageService
      .confirm('edit.del_code_decision', 'common.empty')
      .then(confirmed => {

        let codes = this.codeTasks;
        let index = codes.findIndex(c => c.id == this.context.currentCodeTask.id);
        codes.splice(index, 1);
        if (codes.length == 0)
          this.codeTasks = undefined;

        // console.log("usuwam kod");
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  private addCodeTask() {
    if (this.codeTasks == undefined)
      this.codeTasks = [];
    this.codeTasks.push(new CodeTaskFront());
  }

  // --------------------------------------------------------------------------------------------------------------
  private getCssClass(status: TestResult): string {
    switch (status) {
      case TestResult.None:
        return "fa fa-edit text-warning";
      case TestResult.Correct:
        return "fa fa-check text-success";
      case TestResult.Incorrect:
        return "fa fa-close text-danger";
      default: return "";
    }
  }

  public showImage(imgSrc: string, imgCss: string){
    this.imgSrc = imgSrc;
    this.imgCss = imgCss;
  }

  private hideImage(){
    this.imgSrc = null;
  }
  
}
