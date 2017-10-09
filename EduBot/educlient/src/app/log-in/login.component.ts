import { Component, Output } from '@angular/core'

import { LoginService } from './login.service'
import { FormField } from '../elements/form-field'
import { TextService } from '../languages/text.service'

// import { St}  import żeby mieć dostęp do local storage
// jesli caisteczka - też tu trzeba import


/**
 * Window for:
 * - logginng in,
 * - registering new user,
 * - changing user login and/or password.
 */
// ==================================================================================================================
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService, TextService]
})

export class LoginComponent {

    public loggedIn: boolean = false;

    private title: string;

    private fieldLogin = new FormField(TextService.text('input_login'), '', true)
    private fieldPassw = new FormField(TextService.text('input_password'), '', true)

    private fieldNewLogin = new FormField(TextService.text('input_login_new'), '', false)
    private fieldNewPassw = new FormField(TextService.text('input_password_new'), '', false)
    private fieldRepPassw = new FormField(TextService.text('input_password_rep'), '', false)

    private errCredentials: string;
    private errPasswChange: string;

    private butLoginCaption: string;
    private butRegUserCaption: string;
    private butPasswChangeCaption: string;
    private butOkCaption: string;

    private action: string;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private loginService: LoginService) { // , private localStor: LocalStorage ... ) {
        loginService.setLoginComp(this);

        this.title = TextService.text('title_login');
        this.action = 'logging-in';
        
        this.butLoginCaption = TextService.text('but_log_in');
        this.butRegUserCaption = TextService.text('but_reg_user');
        this.butPasswChangeCaption = TextService.text('but_passw_change');
        this.butOkCaption = TextService.text('but_ok');
    }


    // PUBLIC
    // ==============================================================================================================
    /**
     * Depending on 'this.action' it sends to server one of the following:
     * - credentials in order to log-in the user
     * - login and password to be registered as new user
     * - new login and/or password and credentials to update them in database 
     */
    submitLogin(): void {
        if (this.action == 'logging-in')
            this.logIn();
        else if (this.action == 'register')
            this.registerUser();
        else if (this.action == 'passw-change')
            this.passwChange();
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Tries to log in the user.
     */
    logIn(): void {
        // let loginResult = this.loginService.login(this.fieldLogin.text, this.fieldPassw.text);
        // this.loggedIn = loginResult == 'ok' ? true : false;
        // this.errCredentials = this.loggedIn ? '' : LangDictionaryService.text(loginResult);
        this.loginService.login(this.fieldLogin.text, this.fieldPassw.text);

        // console.log('Logowanie ok?: ', this.loggedIn);
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Records new user in the database.
     */
    registerUser(): void {

    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Changes the user password.
     */
    passwChange(): void {

    }

    // --------------------------------------------------------------------------------------------------------------
    setLoginError(errId: string) {
        this.errCredentials = TextService.text(errId);
    }

    // --------------------------------------------------------------------------------------------------------------
    setPasswChangeError(errId: string) {
        this.errPasswChange = TextService.text(errId);
    }


    // PRIVATE
    // ==============================================================================================================
    /** 
     * Sets {@param newAction}, which determines 
     * - which divs will be visible
     * - which menu buttons will be visible 
     * - what will be the action of 'ok' button. 
     */
    private setAction(newAction: string): void {
        this.action = newAction;

        let titleId: string;
        if (this.action == 'logging-in')
            titleId = 'title_login';
        else if (this.action == 'register')
            titleId = 'title_reg_user';
        else if (this.action == 'passw-change')
            titleId = 'title_passw_change';

        this.title = TextService.text(titleId);
    }
}