import { Component, OnInit } from '@angular/core';

//Models
import { User } from '../../models/user';
import { Role } from '../../models/enum-user-role';

//Services
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-management',
    templateUrl: 'user-management.component.html',
    styleUrls: ['user-management.component.css']
})

export class UserManagementComponent implements OnInit {

    users: User[];
    roles = Role;

    constructor(private userService: UserService){

    }

    ngOnInit(){
        this.userService.getSimpleUsers()
            .subscribe( res => this.users = res);
    }

    changeUserRole(u: User, role: string){
        let temp = u.role;
        u.role = role;
        this.userService.updateUserRole(u)
            .subscribe();
    }

}
