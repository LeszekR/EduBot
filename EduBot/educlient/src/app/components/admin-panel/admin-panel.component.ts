import { Component, Output, EventEmitter } from '@angular/core';

//Services
import { ContextService } from '../../services/context.service';


@Component({
  selector: 'admin-panel',
  template: `
            <div class="admin-panel align-items-center d-block">
                <a *ngIf="true" (click)="onOpenLoginWindow.emit()" class="nvbar-link pr-2" title="Zaloguj">
                    <i class="fa fa-sign-in fa-2x" ></i>
                </a>
                <a *ngIf="true" (click)="switchEditMode()" class="navbar-link pr-2" title="Tryb edycji">
                    <i class="fa fa-edit fa-2x"></i>
                </a>
                <a *ngIf="true" routerLink="/user-management" class="navbar-link pr-2" routerLinkActive="active" title="Zarządzaj użytkownikami">
                    <i class="fa fa-user-circle-o fa-2x"></i>
                </a>
                <a *ngIf="true" routerLink="/" class="navbar-link pr-2" routerLinkActive="active" title="Wyświetl raport">
                    <i class="fa fa-address-book-o fa-2x"></i>
                </a>
            </div>
            `,
    styles: [
        ' .admin-panel i{ vertical-align: middle ;}'
    ]
})
export class AdminPanelComponent {

    constructor(private context: ContextService){}

    @Output() onOpenLoginWindow = new EventEmitter();
    
    switchEditMode(){
        this.context.isEditMode = !this.context.isEditMode;
    }

}