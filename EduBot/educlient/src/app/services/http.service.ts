import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
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
    constructor(backend: XHRBackend, options: RequestOptions, router:Router) {
        //let token = JSON.parse(sessionStorage.getItem('currentUser'));
        options.headers = new Headers();
        //options.headers.append('Authorization', "Bearer " + token);
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Cache-Control', 'no-cache');
        options.headers.append('Pragma', 'no-cache');
        super(backend, options);
        this.router = router;
    }

    // PUBLIC
    // ==============================================================================================================
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
       //let token = JSON.parse(sessionStorage.getItem('currentUser'));
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new Headers() };   
            }
            //options.headers.append('Authorization', `Bearer ` + token);
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Cache-Control', 'no-cache');
            options.headers.append('Pragma', 'no-cache');
        } else {
            url.headers = new Headers();
            //url.headers.append('Authorization', `Bearer ` + token);
            url.headers.append('Content-Type', 'application/json');
            url.headers.append('Cache-Control', 'no-cache');
            url.headers.append('Pragma', 'no-cache');
        }
        return super.request(url, options).catch(this.catchError(this));
    }

    // --------------------------------------------------------------------------------------------------------------
    postHttp(url: string, data: any): Observable<Response> {
        let body = JSON.stringify(data);
        return this.post(url, body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    // PRIVATE
    // ==============================================================================================================
    private catchError(self: HttpService) {
        return (res: Response) => {
            
            return Observable.throw(res);
        };
    }
}