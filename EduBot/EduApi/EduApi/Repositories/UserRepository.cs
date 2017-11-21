using System;
using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using System.Linq;
using EduApi.Dto.Mappers;

namespace EduApi.DAL {
    public class UserRepository : Repository<user>, IUserRepository {
        private edumaticEntities _context;

        //public UserRepository() {
        //    _context = edumaticEntities.getInstance();
        //}

        public UserRepository(edumaticEntities context) : base(context) {
            _context = context;
        }


        public UserDTO Authenticate(string login, string password) {
            var user = _context.user.Where(u => u.login == login && u.password == password).FirstOrDefault();
            return user != null ? UserMappper.GetDTO(user) : null;
        }
    }
}