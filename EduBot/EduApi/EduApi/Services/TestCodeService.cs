using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Services {


    // =================================================================================================
    public class TestCodeService : ITestCodeService {

        private readonly ITestCodeRepository _codeRepository;
        private readonly IUserService _userService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public TestCodeService(
            ITestCodeRepository codeRepository,
            IUserService userService) {

            _codeRepository = codeRepository;
            _userService = userService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public TestCodeDTO UpsertCode(TestCodeDTO codeReceived) {

            var id = codeReceived.id;
            test_code code;

            if (id == 0) {
                code = new test_code();
                TestCodeMapper.CopyValues(codeReceived, code);
                _codeRepository.Add(code);
            }
            else {
                code = _codeRepository.Get(id);
                _codeRepository.SetNewValues(codeReceived, code);
            }

            return TestCodeMapper.GetDTO(code);
        }


        // ---------------------------------------------------------------------------------------------
        public void DeleteCode(int id) {
            _codeRepository.Delete(id);
        }


        // ---------------------------------------------------------------------------------------------
        public List<test_code> SelectCodesForModule(edumodule module) {
            return module.test_code.ToList();
        }


        // ---------------------------------------------------------------------------------------------
        public test_code GetCodeEntity(int id) {
            return _codeRepository.Get(id);
        }
    }
}