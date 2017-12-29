using EduApi.Dto;
using EduApi.DTO;
using System.Collections.Generic;


namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface IModuleService {

        //// ---------------------------------------------------------------------------------------------
        ///* Wywoływana po każdym zamknięciu trybu edycji modułów.
        // * Ustawia wszystkie moduły w prawidłowe drzewo i numeruje (nadaje im kolejne 'group_position').
        // * Dzięki temu przy dalszym korzystaniu można sortować moduły:
        // * - szybko
        // * - również gdy lista jest niekompletna (nieznani są rodzice) 
        // */
        //void CreateModuleSequence();

        // ---------------------------------------------------------------------------------------------
        /* 1. Pobiera wszystkie moduły, które należą do grupy o podanym id_grupy 
         * 2. sortuje wg pozycji w grupie (kolejności)
         */
        List<edumodule> SelectChildren(int? id_grupy);

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
        /* Pobiera cały moduł wybrany wg jego id. 
         * ModuleDTO.test_question.correct_answ  : zawiera index ostatniej odpowiedzi udzielonej przez ucznia 
         * (uczeń może odpowiadać na to samo pytanie wielokrotnie, tu jest ostatnia odpowiedź) */
        ModuleDTO GetModuleLearn(int id, int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera cały moduł wybrany wg jego id. 
         * edumodule.correct_answ  : zawiera index prawidłowej odpowiedzi ustawiony przez nauczyciela */
        ModuleDTO GetModuleEdit(int id);

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
         * pytań wszystkich modułów podrzędnych i połączenie w jedną serię pytań. Pytania
         * zamknięte można edytować tylko na poziomie modułów podstawowych.
         */
        List<ModuleDTO> NewMetaModule(ModuleDTO[] moduleGroup);

        // ---------------------------------------------------------------------------------------------
        /* 1. Usuwa z bazy moduł o podanym id.
         * 2. Jeżeli to był moduł nadrzędny - usuwa id_grupy z dla wszystkich modułów podrzędnych
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
