import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { HttpService } from './http.service';
import { TestData } from '../models/test-data'

@Injectable()
export class TestService {

    private testUrl = 'http://localhost:64365/api/test';

    constructor(private http: HttpService){}
    
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