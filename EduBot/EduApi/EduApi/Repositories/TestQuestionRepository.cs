using EduApi.DAL.Core;
using EduApi.Dto;
using EduApi.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Repositories {


    // =================================================================================================
    public class TestQuestionRepository : Repository<test_question>, ITestQuestionRepository  {

        //private edumaticEntities _context;


        // CONSTRUCTOR
        // =============================================================================================
        public TestQuestionRepository(edumaticEntities context) : base(context) {
            //_context = context;
        }


        // PUBLIC
        // =============================================================================================
        /* Kopiuje dane z TestQuestionDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        public void SetNewValues(TestQuestionDTO source, test_question result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        /* Pobiera wszystkie pytania przypisane do modułu o wskazanym id */
        public List<test_question> SelectQuestionsForModule(int module_id) {
            return _context.test_question.Where(q => q.module_id == module_id).ToList();
        }
    }
}