import { Injectable } from '@angular/core'
import { HttpService } from '../services/http.service'

@Injectable()
export class LoginService {

    url: string = 'http://localhost:64365/api/login';  // adres backend

    constructor(private http: HttpService) { }

    // TODO tu wstawić zapytanie do serwera i przełączenie na GUI lub info że odrzucono logowanie
    public login(login: string, password: string): boolean {
        console.log('Rejestruję - login: ' + login + ', password: ' + password);

        var user = this.http.postHttp(this.url, { login: login, password: password })
            .subscribe();

        console.log('Czekam na serwer.');
        console.log(user);

        //  ['data']...;  // status, uprwnienia, login, czy logowanie prawidłowe

        // zapisać w local storage lub ciasteczku: login, uprawnienia, itd

        return false;
    }
}