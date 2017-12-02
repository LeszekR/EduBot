using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces
{
    public interface IModuleService
    {
        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie moduły i zwraca ich uproszczoną postać - tylko te elementy,
         * które pobierane są w metodzie ModuleMapper.GetSimpleDTO(). */
        List<ModuleDTO> GetSimpleModules();

        // ---------------------------------------------------------------------------------------------
        /* Pobiera moduł wybrany wg jego id. */
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

        /* 1. Sprawdza jaki użytkownik jest przyłączony z tym numerem sesji
         * 2. Na podstawie postępów tego użytkownika decyduje który moduł powinien zostać teraz podany
         * 3. Wysyła id rekomendowanego modułu do frontu
         */
        ModuleDTO NextModule(int userId);
    }
}
