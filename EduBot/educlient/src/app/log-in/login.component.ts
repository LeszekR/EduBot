import { Component, Output }        from '@angular/core'
// import { St}  import żeby mieć dostęp do local storage
// jesli caisteczka - też tu trzeba import

import { LoginService }             from './login.service'
import { FormField }                from '../elements/form-field'
import { LangDictionaryService }    from '../languages/lang-dictionary.service'


@Component ({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService, LangDictionaryService ]
})
export class LoginComponent {
    fieldLogin = new FormField( LangDictionaryService.text('input_login'), '', true)
    fieldPassw = new FormField( LangDictionaryService.text('input_password'), '', true)
    loggedIn: boolean;
    
    butOkCaption: string;

    constructor (private loginService: LoginService) { // , private localStor: LocalStorage ... ) {
        this.butOkCaption = LangDictionaryService.text('but_ok');
    }

    submitLogin(): void {
        console.log(
            'Logowanie ok?: ', 
            String(this.loginService.login( this.fieldLogin.text, this.fieldPassw.text)));

            // znaleźć jak się korzysta z local storage
            // przestawić localStorage.loggedIn = .... zależnie od wyniku logowania
            // przestawić this.loggedIn = localStorage.loggedIn 

            // w frontPage.component.ts dodać *ngIf="loggedIn"
    }
}