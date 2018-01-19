using System.Collections.Generic;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Linq;
using EduApi.Dto.Mappers;
using System;
using System.Configuration;

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



        // PUBLIC
        // =============================================================================================
        public void ClearQuestionHistory(int userId) {
            _userRepository.Get(userId).user_question.Clear();
            _userRepository.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public void ClearModuleHistory(int userId) {
            var user = _userRepository.Get(userId);

            user.edumodule.Clear();
            user.user_question.Clear();
            user.user_code.Clear();
            user.user_distractor.Clear();

            var game = user.user_game;
            game.life = 1000;
            game.shield = 0;
            game.rank = 0;
            game.promotion = 0;

            _userRepository.SaveChanges();
        }

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
        public int SaveUser(UserDTO user) {
            user entity = new user();
            UserMappper.MapDtoToEntity(user, entity);
            if (_userRepository.All().Where(x => x.login == entity.login).FirstOrDefault() != null) {
                return -1;
            }
//<<<<<<< HEAD
//            //return _userRepository.All().Select(x => x.login == user.Login).SingleOrDefault();
//=======
//>>>>>>> b04bca4ea1395d13dfb77ef858442f46b17faabf

            var maxLife = Int32.Parse(ConfigurationManager.AppSettings["maxLife"]);
            entity.user_game = new user_game() { life = maxLife };
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