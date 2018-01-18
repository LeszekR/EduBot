import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { HttpService } from '../services/http.service';
import { TestData } from '../mock/test-data'


// ==================================================================================================================
@Injectable()
export class TestService {

    private readonly testUrl = 'http://localhost:64365/api/test';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService){}


    // PUBLIC
    // ==============================================================================================================
    getGet(): Observable<any>{
        return this.http.get(this.testUrl)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    testPost(data: TestData): Observable<any>{
        let body = JSON.stringify(data);
        return this.http.post(this.testUrl, body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
}