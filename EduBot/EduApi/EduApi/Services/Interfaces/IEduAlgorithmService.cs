
using System;

namespace EduApi.Services.Interfaces {

    public interface IEduAlgorithmService {

        // ---------------------------------------------------------------------------------------------
        /* 1. sprawdzenie stanu emocjonalnego i dotychczasowych wyników użytkownika
         * 2. sprawdzenie dotychczasowych yników 
         * 3. decyzja czy następny moduł ma być łatwiejszy, trudniejszy, czy taki sam
         */
        Tuple<ChangeDifficulty, DistractorType> PickNextDiffAndDistract(int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobranie następnego modułu o wymaganym poziomie trudności (ten sam | up | down).
         * Jeżeli nie da się zmienić poziomu w żądanym kierunku - na tym samym poziomie.
         * Jeżeli to ostatni moduł materiału - zwraca null.
         */
        edumodule PickNextModule(int lastModuleId, ChangeDifficulty change);
    }
}
