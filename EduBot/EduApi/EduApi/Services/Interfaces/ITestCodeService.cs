using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface ITestCodeService {

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie zadania z kodu  dla danego modułu. 
         * Jeżeli to nie jest moduł 'easy' - pobiera w tym celu wszystkie zadania
         * swoich dzieci (rekurencyjnie). 
         */
        List<test_code> SelectCodesForModule(int module_id);

        // ---------------------------------------------------------------------------------------------
        TestCodeDTO UpsertCode(TestCodeDTO codeReceived);

        // ---------------------------------------------------------------------------------------------
        void DeleteCode(int id);

        // ---------------------------------------------------------------------------------------------
        test_code GetCodeEntity(int id);
    }
}
