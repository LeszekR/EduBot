import { Injectable } from '@angular/core'
import { HttpService } from '../services/http.service'
import { LoginComponent } from './login.component'


// ==================================================================================================================
@Injectable()
export class LoginService {

    url: string = 'http://localhost:64365/api/login';  // adres backend
    loginComp: LoginComponent;


    // --------------------------------------------------------------------------------------------------------------
    constructor(private http: HttpService) { }


    // --------------------------------------------------------------------------------------------------------------
    // TODO tu wstawić zapytanie do serwera i przełączenie na GUI lub info że odrzucono logowanie
    public login(login: string, password: string): void {

        // console.log('Rejestruję - login: ' + login + ', password: ' + password);

        let user = this.http.postHttp(this.url, { login: login, password: password })
            .subscribe(
            data => {
                this.loginComp.loggedIn = true;
                console.log(data)
                //  ['data']...;  // status, uprwnienia, login, czy logowanie prawidłowe
                // zapisać w local storage lub ciasteczku: login, uprawnienia, itd
                // przestawić localStorage.loggedIn = .... zależnie od wyniku logowania
                // przestawić this.loggedIn = localStorage.loggedIn 
            },
            err => { 
                this.loginComp.setLoginError(err.status < 500 ? 'err_credentials' : 'err_server');
                console.log(err);
            }
            );
    }


    // --------------------------------------------------------------------------------------------------------------
    public setLoginComp(loginComp: LoginComponent) {
        this.loginComp = loginComp;
    }
}