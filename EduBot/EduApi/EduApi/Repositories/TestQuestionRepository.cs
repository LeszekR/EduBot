using EduApi.DAL.Core;
using EduApi.Dto;
using EduApi.Repositories.Interfaces;

namespace EduApi.Repositories {


    // =================================================================================================
    public class TestQuestionRepository : Repository<test_question>, ITestQuestionRepository {


        // CONSTRUCTOR
        // =============================================================================================
        public TestQuestionRepository(edumaticEntities context) : base(context) { }


        // PUBLIC
        // =============================================================================================
        /* Kopiuje dane z TestQuestionDTO do test_question pobranego z bazy i zapisuje zmiany w bazie. */
        public void SetNewValues(TestQuestionDTO source, test_question result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }
    }
}