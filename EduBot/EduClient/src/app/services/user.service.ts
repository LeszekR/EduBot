import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

import { User } from '../models/user';

// ==================================================================================================================
@Injectable()
export class UserService {

    private userPath = '/api/user';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService){}


    // PUBLIC
    // ==============================================================================================================
    getSimpleUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userPath);
    }

    // --------------------------------------------------------------------------------------------------------------
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.userPath, user);
    }

    // --------------------------------------------------------------------------------------------------------------
    updateUserRole(user: User): any {
        return this.http.put(this.userPath + '/role', user);
    }    
}