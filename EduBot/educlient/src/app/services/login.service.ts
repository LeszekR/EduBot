import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { JwtHelper } from '../shared/utils/jwt-helper';
import { ContextService } from './context.service';
import { Role } from '../models/enum-user-role';
import { Observable } from 'rxjs/Observable';

// ==================================================================================================================
@Injectable()
export class LoginService {

    private authUrl = 'http://localhost:64365/oauth2/token';  

    constructor(private http: Http, private context: ContextService) { }


    login(login: string, password: string): Observable<any> {

        var headers = new Headers();
        var credentials = 'username=' + login + '&password=' + password + '&grant_type=password';
        
        return this.http.post(this.authUrl, credentials, {headers: headers})  
    }

    logout(){
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('access_token');
        this.context.userRole = null;
        this.context.isEditMode = false;
    }
}