using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using System.Linq;
using EduApi.Dto.Mappers;

namespace EduApi.DAL {


    // =================================================================================================
    public class UserRepository : Repository<user>, IUserRepository {

        private edumaticEntities _context;


        // CONSTRUCTOR
        // =============================================================================================
        public UserRepository(edumaticEntities context) : base(context) {
            _context = context;
        }


        // PUBLIC
        // =============================================================================================
        public UserDTO Authenticate(string login, string password) {
            var user = _context.user.Where(u => u.login == login && u.password == password).FirstOrDefault();
            return user != null ? UserMappper.GetDTO(user) : null;
        }


        // ---------------------------------------------------------------------------------------------
        public void UpdateUserRole(int userId, string role) {
            var user = _context.user.Where(u => u.id == userId).FirstOrDefault();
            user.role = role;
            _context.SaveChanges();
        }


        // ---------------------------------------------------------------------------------------------
        public int? GetLastModuleId(int userId) {
            return Get(userId).last_module; 
        }
    }
}