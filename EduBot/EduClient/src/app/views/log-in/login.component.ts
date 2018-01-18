import { Component, Output, EventEmitter, ViewChild } from '@angular/core'
import { ModalModule, ModalDirective } from 'ngx-bootstrap';

import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { FormField } from '../../components/form-field/form-field';
import { User } from '../../models/user';
import { JwtHelper } from '../../shared/utils/jwt-helper';
import { Role } from '../../models/enums';
import { ContextService } from '../../services/context.service';
import { SpinnerService } from '../../shared/components/spinner/spinner.service';
import { Observable } from 'rxjs/Observable';



/**
 * Window for:
 * - logginng in,
 * - registering new user,
 * - changing user login and/or password.
 */
// ==================================================================================================================
@Component({
    selector: 'login-window',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})

export class LoginComponent {

    @ViewChild('loginModal') lgModal: ModalDirective;

    public KEY_ENTER = 13;
    public KEY_ESC = 27;

    public loggedIn: boolean = false;

    private title: string;
    private regulationsApproval: boolean = false;

    private fieldLogin = new FormField('login.login', '', true);
    private fieldPassw = new FormField('login.password', '', true);

    private fieldNewLogin;
    private fieldNewPassw;
    private fieldRepPassw;

    private errCredentials: string;
    private errPasswChange: string;

    private action: string;

    private registerSuccess = false;
    private registerFailure = false;


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private loginService: LoginService,
        private userService: UserService,
        private context: ContextService,
        private spinner: SpinnerService) {

        this.action = 'logging-in';
        this.initializeRegisterForm();
    }

    show(){
        this.lgModal.show();
        setTimeout(() => {
            document.getElementById('login').getElementsByTagName('input')[0].focus();
        }, 500);

        document.onkeydown = (e:any) => {
            console.log("Key event");
            switch (e.which) {
                case this.KEY_ESC:
                    this.lgModal.hide();
                    break;

                case this.KEY_ENTER:
                    this.submitLogin();
                    break;
            }
        };
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
        this.registerSuccess = false;
        this.registerFailure = false;
        if (this.action === 'logging-in')
            this.logIn();
        else if (this.action === 'register') {
            this.registerUser().subscribe(() => {
                this.initializeRegisterForm();
                this.action = 'logging-in';
                this.registerSuccess = true;
            }, response => {
                this.registerFailure = true;
            });
        }
        else if (this.action === 'passw-change')
            this.passwChange();
    }

    passwordCmp(): boolean {
        return (this.action === 'register' || this.action === 'passw-change') &&
            (this.fieldNewPassw.text !== this.fieldRepPassw.text ||
            !this.regulationsApproval);
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Tries to log in the user.
     */
    logIn(): void {
        this.spinner.start();

        this.loginService.login(this.fieldLogin.text, this.fieldPassw.text)
            .subscribe(res => {
                let token = res.json().access_token;
                sessionStorage.setItem('access_token', token);
                let decoded = new JwtHelper().decodeToken(token);
                sessionStorage.setItem('user_role', decoded.role);
                this.context.userRole = Role[<string>decoded.role];
                this.spinner.stop();
                this.lgModal.hide();
            },
            err => {
                this.setLoginError(err.status < 500 ? 'err_credentials' : 'err_server');
                console.log(err);
                this.spinner.stop();
            }
            );
    }

    // --------------------------------------------------------------------------------------------------------------
    /**
     * Records new user in the database.
     */
    registerUser(): Observable<User> {
        let user = new User();
        user.login = this.fieldNewLogin.text;
        user.password = this.fieldNewPassw.text;

        return this.userService.addUser(user);
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

    private initializeRegisterForm(): void {
        this.fieldNewLogin = new FormField('login.new_login', '', false);
        this.fieldNewPassw = new FormField('login.new_password', '', false);
        this.fieldRepPassw = new FormField('login.repeat_password', '', false);
    }
}
