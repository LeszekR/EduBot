import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:64365/api/user';

    constructor(private http: HttpService){}

    
}