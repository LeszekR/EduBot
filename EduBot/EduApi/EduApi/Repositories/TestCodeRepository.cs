using EduApi.DAL.Core;
using EduApi.Dto;
using EduApi.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Repositories {


    // =================================================================================================
    public class TestCodeRepository : Repository<test_code>, ITestCodeRepository {


        // CONSTRUCTOR
        // =============================================================================================
        public TestCodeRepository(edumaticEntities context) : base(context) { }


        // PUBLIC
        // =============================================================================================
        /* Kopiuje dane z TestCodeDTO do test_code pobranego z bazy i zapisuje zmiany w bazie. */
        public void SetNewValues(TestCodeDTO source, test_code result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }

        //// ---------------------------------------------------------------------------------------------
        ///* Pobiera wszystkie pytania przypisane do modułu o wskazanym id */
        //public List<test_code> SelectCodesForModule(int module_id) {
        //    return _context.test_code.Where(q => q.module_id == module_id).ToList();
        //}
    }
}