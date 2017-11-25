import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Models
import { SharedModule } from '../../shared/shared.module';
import { UserManagementComponent } from './user-management.component';

//Services
import { UserService } from '../../services/user.service'

//Routing
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        UserManagementRoutingModule
    ],
    declarations: [
        UserManagementComponent
    ],
    providers: [
        UserService
    ]
})
export class UserManagementModule { }