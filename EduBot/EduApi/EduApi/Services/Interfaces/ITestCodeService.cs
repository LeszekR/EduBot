using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface ITestCodeService {

        // ---------------------------------------------------------------------------------------------
        TestCodeDTO UpsertCode(TestCodeDTO codeReceived);

        // ---------------------------------------------------------------------------------------------
        void DeleteCode(int id);

        // ---------------------------------------------------------------------------------------------
        test_code GetCodeEntity(int id);
    }
}
