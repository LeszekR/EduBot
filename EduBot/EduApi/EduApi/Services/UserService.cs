﻿using System.Collections.Generic;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Linq;
using EduApi.Dto.Mappers;
using System;

namespace EduApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        #region Constructor
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        #endregion

        public IList<UserDTO> GetUsers()
        {
            return _userRepository.All().Select(x => UserMappper.GetSimpleDTO(x)).ToList();
        }

        public UserDTO Authenticate(string login, string password)
        {
            return _userRepository.Authenticate(login, password);
        }
    }
}