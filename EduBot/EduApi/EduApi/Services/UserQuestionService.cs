using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace EduApi.Services {

    // =================================================================================================
    public class UserQuestionService : IUserQuestionService {

        private readonly IUserQuestionRepository _userQuestionRepository;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public UserQuestionService(IUserQuestionRepository userQuestionRepository) {
            _userQuestionRepository = userQuestionRepository;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public user_question Add(user_question newUserQuestion) {
            return _userQuestionRepository.Add(newUserQuestion);
        }
    }
}