export class TextService {

    // TODO : inicjalizacja słownika przy starcie aplikacji - dla danego języka
    // TODO : pobieranie słownika z pliku dla danego języka

    private static dictionary: object = {

        // log-in
        title_login: 'Logowanie',
        title_reg_user: 'Rejestracja nowego użytkownika',
        title_passw_change: 'Zmiana hasła lub loginu',

        input_login: 'login',
        input_password: 'hasło',
        input_login_new: 'nowy login',
        input_password_new: 'nowe hasło',
        input_password_rep: 'powtórz hasło',

        but_log_in: 'Zaloguj się',
        but_reg_user: 'Zarejestruj się',
        but_passw_change: 'Zmień login lub hasło.',

        err_credentials: 'Nieprawidłowe dane logowania',
        err_passw_repeat: 'Hasła są różne.',
        err_server: 'Błąd serwera. Czy serwer jest uruchomiony?',
        
        
        // non-specific       
        but_ok: 'Ok',
        but_cancel: 'Anuluj',
    }

    public static text(key: string): string {
        return this.dictionary[key];
    }
}