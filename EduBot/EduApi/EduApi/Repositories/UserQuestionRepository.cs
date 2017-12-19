using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;

namespace EduApi.Repositories {


    // =================================================================================================
    public class UserQuestionRepository : Repository<user_question>, IUserQuestionRepository  {

        //private edumaticEntities _context;


        // CONSTRUCTOR
        // =============================================================================================
        public UserQuestionRepository(edumaticEntities context) : base(context) {
            //_context = context;
        }


        // PUBLIC
        // =============================================================================================
    }
}