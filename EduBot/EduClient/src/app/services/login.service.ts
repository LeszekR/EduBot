import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { ContextService } from './context.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {HttpService} from "./http.service";

// ==================================================================================================================
@Injectable()
export class LoginService {

    private authUrl = HttpService.API_HOST + '/oauth2/token';

    constructor(private http: Http, private context: ContextService, private router: Router) { }


    login(login: string, password: string): Observable<any> {

        const headers = new Headers();
        const credentials = 'username=' + login + '&password=' + password + '&grant_type=password';

        return this.http.post(this.authUrl, credentials, {headers: headers});
    }

    logout() {
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('access_token');
        this.context.userRole = null;
        this.context.isEditMode = false;
        this.router.navigate(['/']);
    }
}