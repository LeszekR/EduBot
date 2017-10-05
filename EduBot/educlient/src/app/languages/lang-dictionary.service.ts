export class LangDictionaryService {

    // TODO : inicjalizacja słownika przy starcie aplikacji - dla danego języka
    // TODO : pobieranie słownika z pliku dla danego języka

    private static dictionary: object = {
        input_login: 'Login',
        input_password: 'Hasło',
        but_ok: 'Ok',
        but_cancel: 'Anuluj'
    }

    public static text(key: string): string {
        return this.dictionary[key];
    }
}