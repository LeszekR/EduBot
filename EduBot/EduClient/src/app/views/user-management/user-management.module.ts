import { NgModule } from '@angular/core';

//Models
import { UserManagementComponent } from './user-management.component';

//Services
import { UserService } from '../../services/user.service'

//Routing
import { UserManagementRoutingModule } from './user-management-routing.module';

@NgModule({
    imports: [
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