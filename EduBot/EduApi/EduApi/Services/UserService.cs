using System.Collections.Generic;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Linq;
using EduApi.Dto.Mappers;
using System;

namespace EduApi.Services {


    // =================================================================================================
    public class UserService : IUserService {

        private readonly IUserRepository _userRepository;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public UserService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }
        #endregion


        // MOCK
        // =============================================================================================
        public void ClearQuestionHistory(int userId) {
            var questions = _userRepository.Get(userId).user_question;
            questions.Clear();
            _userRepository.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public void ClearModuleHistory(int userId) {
            var user = _userRepository.Get(userId);
            user.edumodule.Clear();
            user.user_question.Clear();
            user.user_distractor.Clear();
            _userRepository.SaveChanges();
        }


        // PUBLIC
        // =============================================================================================
        //public List<user_question> GetQuestionsOfUser(int userId) {
        //    return _userRepository.Get(userId).user_question.ToList();
        //}

        // ---------------------------------------------------------------------------------------------
        public void SaveChanges() {
            _userRepository.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public user GetUserEntity(int id) {
            return _userRepository.Get(id);
        }

        // ---------------------------------------------------------------------------------------------
        public IList<UserDTO> GetUsers() {
            return _userRepository.All().Select(x => UserMappper.GetSimpleDTO(x)).ToList();
        }

        // ---------------------------------------------------------------------------------------------
        public UserDTO Authenticate(string login, string password) {
            return _userRepository.Authenticate(login, password);
        }

        // ---------------------------------------------------------------------------------------------
        public int SaveUser(UserDTO user) {
            user entity = new user();
            UserMappper.MapDtoToEntity(user, entity);
            entity.role = "student";
            return _userRepository.Add(entity).id;
        }

        // ---------------------------------------------------------------------------------------------
        public void UpdateUserRole(UserDTO user) {
            _userRepository.UpdateUserRole(user.Id, user.Role);
        }

        // ---------------------------------------------------------------------------------------------
        public bool DeleteUser(int id) {
            throw new NotImplementedException();
        }
    }
}