
using EduApi.Dto;
using EduApi.DTO;
using System;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    public interface IEduAlgorithmService {

        // ---------------------------------------------------------------------------------------------
        /* Wysyła moduły łatwiejsze składające się na wskazany moduł trudniejszy.
         * Front wywołuje ten endpoint pod warunkiem, że oglądany moduł nie jest  
         * modułem o najniższym poziomie trudności (difficulty != 'easy').
         */
        List<ModuleDTO> ExplainModule(int userId, int moduleId);

        // ---------------------------------------------------------------------------------------------
        /* 1. Na podstawie postępów użytkownika decyduje który moduł powinien zostać teraz podany
         * 2. Jeżeli aktualnie oglądany to najnowszy z pokazanych użytkownikowi - określa jaki przysłać 
         *    na podstawie stanu emocjonalnego oraz wyników ucznia
         * 3. Jeżeli wcześniej użytkownik wcisnął 'wstecz' - wysyła ten, który przedtem podano jako następny
         *    po aktualnie wyświetlanym
         * 4. Wysyła wybrany moduł do frontu
         */
        ModuleAndDistractorDTO NextModule(int userId, int currentModuleId);

        // ---------------------------------------------------------------------------------------------
        /* Wysyła do frontu moduł znajdujący się w kolejności przed
         * modułem oglądanym w tej chwili.
         * Jeśli użytkownik jeszcze nie otrzymał żadnych modułów - wysyła null.
         */
        ModuleAndDistractorDTO PrevModule(int userId, int currentModuleId);
    }
}
