import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


// ==================================================================================================================
/**
 * Serwis obsługjący zapytania http. 
 * Pozwala na globalną konfigurację nagłówków w requestach.
 */
@Injectable()
export class HttpService extends Http {

    private router: Router;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(backend: XHRBackend, options: RequestOptions, router: Router) {
        //let token = JSON.parse(sessionStorage.getItem('currentUser'));

        super(backend, options);
        this.router = router;
    }

    // PUBLIC
    // ==============================================================================================================
    post<T>(url: string, data: any): Observable<T> {
        let options: RequestOptionsArgs = this.setHeaders({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(data);
        return super.post(url, body, options)
            .map((res: Response) => res.json())
            .catch(error => this.catchError(error));
        }

    // --------------------------------------------------------------------------------------------------------------
    get<T>(url: string): Observable<T> {
        let options: RequestOptionsArgs = this.setHeaders({});
        return super.get(url, options)
            .map((res: Response) => res.json())
            .catch(error => this.catchError(error));
    }

    // --------------------------------------------------------------------------------------------------------------
    delete<T>(url: string, data: any): Observable<T> {
        let options: RequestOptionsArgs = this.setHeaders({});
        options.body = JSON.stringify(data);
        return super.delete(url, options)
            .map((res: Response) => res.json())
            .catch(error => this.catchError(error));
    }

    // --------------------------------------------------------------------------------------------------------------
    // request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // //let token = JSON.parse(sessionStorage.getItem('currentUser'));

    // if (typeof url === 'string') {
    //     if (!options) {
    //         options = { headers: new Headers() };
    //     }
    //     //options.headers.append('Authorization', `Bearer ` + token);
    //     options.headers.append('Content-Type', 'application/json');
    //     options.headers.append('Cache-Control', 'no-cache');
    //     options.headers.append('Pragma', 'no-cache');
    // } else {
    //     url.headers = new Headers();
    //     //url.headers.append('Authorization', `Bearer ` + token);
    //     url.headers.append('Content-Type', 'application/json');
    //     url.headers.append('Cache-Control', 'no-cache');
    //     url.headers.append('Pragma', 'no-cache');
    // }
    // return super.request(url, options).catch(this.catchError(this));
    // }


    // PRIVATE
    // ==============================================================================================================
    private setHeaders(headersToSet: Object): RequestOptionsArgs {
        let newHeaders: Headers = new Headers();

        let keys = Object.keys(headersToSet);
        for (var i in keys) 
            newHeaders.append(keys[i], headersToSet[keys[i]]);

        //newHeaders.append('Authorization', `Bearer ` + token);
        newHeaders.append('Cache-Control', 'no-cache');
        newHeaders.append('Pragma', 'no-cache');

        let options: RequestOptionsArgs = { headers: newHeaders };
        return options;
    }

    // --------------------------------------------------------------------------------------------------------------
    private catchError(error: any): Observable<Response> {
        console.log(error);
        return Observable.throw(error);
    }
}