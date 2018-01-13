using EduApi.DTO;
using System.Collections.Generic;


namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface IModuleService {

        /* Wypełnia wszystkie meta moduły połączeniem treści, przykładów, quizów i zadań ich dzieci.
         */
        string FillMetaModules();

        // ---------------------------------------------------------------------------------------------
        /* 1. Pobiera wszystkie moduły, które należą do grupy o podanym parentId 
         * 2. sortuje wg pozycji w grupie (kolejności)
         */
        List<edumodule> SelectChildren(int? parentId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy moduły wcześniej już wysłane do danego użytkownika
         * i zwraca ich uproszczoną postać - tylko te elementy,
         * które pobierane są w metodzie ModuleMapper.GetSimpleDTO(). 
         * Dołącza informację o tym, czy użytkownik zaliczył: 
         * - pytania, 
         * - kod
         * do każdego modułu (to pozwala je pokolorować na liście we froncie).
         */
        List<ModuleDTO> GetSimpleModules(int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie moduły i zwraca ich uproszczoną postać - tylko te elementy,
         * które pobierane są w metodzie ModuleMapper.GetSimpleDTO(). */
        List<ModuleDTO> GetSimpleModules();

        // ---------------------------------------------------------------------------------------------
        /* Pobiera cały moduł oraz pytania do tego modułu. 
         * We wszystkich pytaniach 'correct_answ' zawiera index OSTATNIEJ odpowiedzi 
         * udzielonej przez ucznia (uczeń może odpowiadać na to samo pytanie wielokrotnie, 
         * tu jest ostatnia odpowiedź) */
        ModuleDTO GetModuleLearn(int id, int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera cały moduł oraz pytania do tego modułu. 
         * We wszystkich pytaniach 'correct_answ' zawiera index PRAWIDŁOWEJ odpowiedzi 
         * ustawiony przez nauczyciela */
        ModuleDTO GetModuleEdit(int id);

        // ---------------------------------------------------------------------------------------------
         /* Zamienia moduł w ModuleDTO oraz dodaje do niego jego wszystkie pytania.
          * Wersje:
          * 1. @userId < 0 : Pytania będą zawierać indeks prawidłowej odpowiedzi
          *    (wersja do edycji modułów).
          * 2. @userId > 0 : pytania będą zawierały indeks ostatniej odpowiedzi
          *    udzielonej przez użytkownika (wersja wyświetlana studentowi). 
          */ 
        ModuleDTO GetDTOWithQuestions(edumodule module, int userId);

        // ---------------------------------------------------------------------------------------------
        /* Aktualizuje dane modułu */
        ModuleDTO UpsertModule(ModuleDTO moduleReceived);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera elementy, które znajdują się w modułach zawartych w moduleGroup i łączy je:
         * - elementy content => w jeden string oddzielony pustymi liniami: nowy content
         * - elemnty example => w jeden string oddzielony pustymi liniami: nowy example
         * 
         * Z tak uzyskanych nowych elementów tworzy nowy moduł.
         * Ten moduł zapisuje w bazie i zwraca go do kontrolera.
         * 
         * UWAGI:
         * 1. Tak utworzony moduł następnie użytkownik może edytować tak samo
         * jak moduły niższego poziomu. Użytkownik odpowiada za spójność treści meta-modułu
         * uzyskanego tą metodą z zawartością modułów podrzędnych.
         * 2. Pytania zamknięte meta-modułu są pobierane z bazy poprzez pobranie
         * pytań wszystkich modułów podrzędnych i połączenie w jedną serię pytań. Pytania
         * zamknięte można edytować tylko na poziomie modułów podstawowych.
         */
        List<ModuleDTO> NewMetaModule(ModuleDTO[] moduleGroup);

        // ---------------------------------------------------------------------------------------------
        /* 1. Usuwa z bazy moduł o podanym id.
         * 2. Jeżeli to był moduł nadrzędny - usuwa parentId z dla wszystkich modułów podrzędnych
         */
        List<ModuleDTO> DeleteModule(int id);

        //// ---------------------------------------------------------------------------------------------
        ///* Sortuje moduły wg
        // * 1. group_position
        // * 2. jeżeli group_position == null - wówczas wg id
        // * Atrybut group_position jest ustawiany w metodzie ModuleService.CreateModuleSequence po 
        // * każdym zakończeniu edycji modułów.
        // */
        //void SortGroupPosition(ref List<edumodule> modules);
    }
}
