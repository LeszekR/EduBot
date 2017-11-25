import { Component, OnInit } from '@angular/core';

//Models
import { User } from '../../models/user';

//Services
import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-management',
    templateUrl: 'user-management.component.html',
})

export class UserManagementComponent implements OnInit {

    users: User[];

    constructor(private userService: UserService){

    }

    ngOnInit(){
        this.userService.getSimpleUsers()
            .subscribe( res => this.users = res);
    }

}
