import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//serwis pozwalający na globalną konfigurację nagłówków w requestach
@Injectable()
export class HttpService extends Http {

    private router: Router;

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

    private catchError(self: HttpService) {
        return (res: Response) => {
            
            return Observable.throw(res);
        };
    }
}