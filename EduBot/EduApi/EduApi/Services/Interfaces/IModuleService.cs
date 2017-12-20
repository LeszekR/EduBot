using EduApi.Dto;
using EduApi.DTO;
using System.Collections.Generic;


namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface IModuleService {

        /* Wysyła moduły łatwiejsze składające się na wskazany moduł trudniejszy.
         * Front wywołuje ten endpoint tylko gdy oglądany moduł nie jest na najłatwiejszym poziomie
         * trudności (difficulty != 'easy').
         */
        List<ModuleDTO> ExplainModule(int userId, int moduleId);

        /* Wywoływana po każdym zamknięciu trygu edycji modułów.
         * Ustawia wszystkie moduły w prawidłowe drzewo i numeruje: nadaje kolejne 'group_position'.
         * Dzięki temu przy dalszym korzystaniu można sortować moduły:
         * - szybko
         * - również gdy lista jest niekompletna (nieznani są rodzice) 
         */
        void CreateModuleSequence();

        // ---------------------------------------------------------------------------------------------
        /* 1. Na podstawie postępów użytkownika decyduje który moduł powinien zostać teraz podany
         * 2. Jeżeli aktualnie oglądany to najnowszy z pokazanych użytkownikowi - określa jaki przysłać 
         *    na podstawie stanu emocjonalnego oraz wyników ucznia
         * 3. Jeżeli wcześniej użytkownik wcisnął 'wstecz' - wysyła ten, który przedtem podanoo jako następny
         *    po aktualnie wyświetlanym
         * 4. Wysyła wybrany moduł do frontu
         */
        ModuleDTO NextModule(int userId, int currentModuleId);

        // ---------------------------------------------------------------------------------------------
        /* Wysyła do frontu poprzedni moduł oglądany przez użytkownika przed
         * modułem oglądanym w tej chwili.
         * Jeśli użytkownik jeszcze nie otrzymał żadnych modułów - wysyła null.
         */
        ModuleDTO PrevModule(int userId, int currentModuleId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy moduły wcześniej już wysłane do danego użytkownika
         * i zwraca ich uproszczoną postać - tylko te elementy,
         * które pobierane są w metodzie ModuleMapper.GetSimpleDTO(). */
        List<ModuleDTO> GetSimpleModules(int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie moduły i zwraca ich uproszczoną postać - tylko te elementy,
         * które pobierane są w metodzie ModuleMapper.GetSimpleDTO(). */
        List<ModuleDTO> GetSimpleModules();

        // ---------------------------------------------------------------------------------------------
        /* Pobiera cały moduł wybrany wg jego id. */
        ModuleDTO GetModule(int id);

        // ---------------------------------------------------------------------------------------------
        /* Aktualizuje dane modułu */
        ModuleDTO UpsertModule(ModuleDTO moduleReceived);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera elementy, które znajdują się w modułach zawartych w moduleGroup i łączy je:
         * - elementy content => w jeden string oddzielony pustymi liniami: nowy content
         * - elemnty example => w jeden string oddzielony pustymi liniami: nowy example
         * - elementy 'pytanie dla testu z kodu' => w jeden string oddzielony pustymi liniami: nowy test z kodu
         * 
         * Z tak uzyskanych nowych elementów tworzy nowy moduł.
         * Ten moduł zapisuje w bazie i zwraca go do kontrolera.
         * 
         * UWAGI:
         * 1. Tak utworzony moduł następnie użytkownik może edytować tak samo
         * jak moduły niższego poziomu. Użytkownik odpowiada za spójność treści meta-modułu
         * uzyskanego tą metodą z zawartością modułów podrzędnych.
         * 2. Pytania zamknięte meta-modułu są pobierane z bazy poprzez pobranie
         * pytań wszystkich modułów podrzędnych i łączone w jedną serię pytań. Pytania
         * zamknięte można edytować tylko na poziomie modułów podstawowych.
         */
        ModuleDTO NewMetaModule(ModuleDTO[] moduleGroup);

        // ---------------------------------------------------------------------------------------------
        /* 1. Usuwa z bazy moduł o podanym id.
         * 2. Jeżeli to był moduł nadrzędny - usuwa id_grupy z dla wszystkich modułów podrzędnych
         */
        List<ModuleDTO> DeleteModule(int id);
    }
}
