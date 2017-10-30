using System;
using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;

namespace EduApi.DAL
{
    public class UserRepository : Repository<user>, IUserRepository
    {
        private edumaticEntities _context;

        public UserRepository(edumaticEntities context) : base(context)
        {
            _context = context;
        }

        public UserDTO LogUser(string login, string password)
        {
            return null;
        }
    }
}