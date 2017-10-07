import { HttpService }          from '../services/http.service'


export class LoginService {

    url: string = 'http://localhost:64365/api/login';  // adres backend

    constructor (private http: HttpService ){}

    // TODO tu wstawić zapytanie do serwera i przełączenie na GUI lub info że odrzucono logowanie
    public login (login: string, password: string): boolean {
        console.log('login: ' + login + ', password: ' + password);
        
        this.http.postHttp(this.url, {login: login, password: password})                    
                 .subscribe()
                 ['data']...;  // status, uprwnienia, login, czy logowanie prwidłowe

                    // zapisać w local storage lub ciasteczku:
                    // login, 
                    // uprawnienia 

                    return ..
    }
}