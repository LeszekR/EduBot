import { Component, Output }        from '@angular/core'

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
    fieldLogin = new FormField( LangDictionaryService.text('input_login'), '', true);
    fieldPassw = new FormField( LangDictionaryService.text('input_password'), '', true);
    
    butOkCaption: string;
    // butCancelCaption: string;

    constructor (private loginService: LoginService) {
        this.butOkCaption = LangDictionaryService.text('but_ok');
        // this.butCancelCaption = LangDictionaryService.text('but_cancel');
    }

    submitLogin(): void {
        this.fieldPassw.text = this.loginService.login(this.fieldLogin.text);
    }
}