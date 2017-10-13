import { Component, Output, EventEmitter } from '@angular/core';

//Services
import { ContextService } from '../../services/context.service';


@Component({
  selector: 'toolbar',
  template: `
            <div class="toolbar align-items-center d-block">
                <a *ngIf="true" (click)="onOpenLoginWindow.emit()" class="nvbar-link pr-2" title="{{ 'toolbar.log_in' | translate }}">
                    <i class="fa fa-sign-in fa-2x" ></i>
                </a>
                <a *ngIf="true" (click)="switchEditMode()" class="navbar-link pr-2" title="{{ 'toolbar.edit_mode' | translate }}">
                    <i class="fa fa-edit fa-2x"></i>
                </a>
                <a *ngIf="true" routerLink="/user-management" class="navbar-link pr-2" routerLinkActive="active" title="{{ 'toolbar.manage_users' | translate }}">
                    <i class="fa fa-user-circle-o fa-2x"></i>
                </a>
                <a *ngIf="true" routerLink="/" class="navbar-link pr-2" routerLinkActive="active" title="{{ 'toolbar.view_report' | translate }}">
                    <i class="fa fa-address-book-o fa-2x"></i>
                </a>
            </div>
            `,
    styles: [
        ' .toolbar i{ vertical-align: middle ;}'
    ]
})
export class ToolbarComponent {

    constructor(private context: ContextService){}

    @Output() onOpenLoginWindow = new EventEmitter();
    
    switchEditMode(){
        this.context.isEditMode = !this.context.isEditMode;
    }

}