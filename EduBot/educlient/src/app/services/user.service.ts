import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

import { User } from '../models/user';

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:64365/api/user';

    constructor(private http: HttpService){}

    getSimpleUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.userUrl, user);
    }
    
}