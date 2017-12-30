import { Component, Output, EventEmitter } from '@angular/core'

import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { FormField } from '../form-field/form-field';
import { User } from '../../models/user';
import { JwtHelper } from '../../shared/utils/jwt-helper';
import { Role } from '../../models/enum-user-role';
import { ContextService } from '../../services/context.service';
import { SpinnerService } from '../../shared/components/spinner/spinner.service';

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
    providers: [LoginService]
})

export class LoginComponent {

    @Output() onClose = new EventEmitter();

    public loggedIn: boolean = false;

    private title: string;
    private regulationsApproval: boolean = false;

    private fieldLogin = new FormField('login.login', '', true)
    private fieldPassw = new FormField('login.password', '', true)

    private fieldNewLogin = new FormField('login.new_login', '', false)
    private fieldNewPassw = new FormField('login.new_password', '', false)
    private fieldRepPassw = new FormField('login.repeat_password', '', false)

    private errCredentials: string;
    private errPasswChange: string;

    private action: string;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private loginService: LoginService, 
        private userService: UserService, 
        private context: ContextService,
        private spinner: SpinnerService) { // , private localStor: LocalStorage ... ) {

        this.action = 'logging-in';
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
        this.spinner.start();
        this.loginService.login(this.fieldLogin.text, this.fieldPassw.text)
            .subscribe( res => {
                let token = res.json().access_token;
                sessionStorage.setItem('access_token', token);
                let decoded = new JwtHelper().decodeToken(token);
                sessionStorage.setItem('user_role', decoded.role);
                this.context.userRole = Role[<string>decoded.role];
                this.spinner.stop();
                this.onClose.emit();
            },
            err => { 
                this.setLoginError(err.status < 500 ? 'err_credentials' : 'err_server');
                console.log(err);
                this.spinner.stop();
            }
    );

        // console.log('Logowanie ok?: ', this.loggedIn);
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Records new user in the database.
     */
    registerUser(): void {
        let user = new User();
        user.login = this.fieldNewLogin.text;
        user.password = this.fieldNewPassw.text;

        this.userService.addUser(user).subscribe();
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Changes the user password.
     */
    passwChange(): void {

    }

    // --------------------------------------------------------------------------------------------------------------
    setLoginError(errId: string) {
        this.errCredentials = 'error.login.credentials';
    }

    // --------------------------------------------------------------------------------------------------------------
    setPasswChangeError(errId: string) {
        this.errPasswChange = 'error.login.repeat';
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

        if (this.action == 'logging-in')
            this.title = 'login';
        else if (this.action == 'register')
            this.title = 'login.register_new_user';
        else if (this.action == 'passw-change')
            this.title = 'login.password_change';
    }
}