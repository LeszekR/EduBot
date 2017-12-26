using System.Collections.Generic;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Linq;
using EduApi.Dto.Mappers;
using System;
using EduApi.Dto;
using System.Configuration;

namespace EduApi.Services {


    // =================================================================================================
    public class DistractorService : IDistractorService {

        private readonly IUserService _userService;
        private readonly IDistractorRepository _distractorRepository;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public DistractorService(
            IUserService userService,
            IDistractorRepository distractorRepository) {

            _userService = userService;
            _distractorRepository = distractorRepository;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public void UpsertUserDistractor(user user, distractor distractor) {

            user_distractor nextUserDistract = user.user_distractor
                .FirstOrDefault(ud => ud.distractor_id == distractor.id);

            if (nextUserDistract == null) {
                nextUserDistract = new user_distractor() {
                    user_id = user.id,
                    distractor_id = distractor.id
                };
                user.user_distractor.Add(nextUserDistract);
            }

            nextUserDistract.time_last_used = DateTime.Now;

            _userService.SaveChanges();
        }


        // ---------------------------------------------------------------------------------------------
        public distractor NextDistractor(int userId, DistractorType type) {

            user user = _userService.GetUserEntity(userId);
            List<user_distractor> userToDistracts = user.user_distractor.ToList();


            // nie wysyłamy dystraktora
            if (type == DistractorType.NO_DISTRACTOR)
                return null;


            // ostatni dystraktor był wysłany zbyt niedawno, trzeba jeszcze poczekać z następnym
            if (!TimeForDistractor(ref userToDistracts))
                return null;


            // już czas na nastepny dystraktor
            string typeStr = "";
            if (type == DistractorType.KICK)
                typeStr = "kick";
            else if (type == DistractorType.REWARD)
                typeStr = "reward";


            // pobranie wszystkich dystraktorów wymaganego typu
            var distractsAll = _distractorRepository.All().ToList();
            var distractsOfType = distractsAll.Where(d => d.type == typeStr).ToList();


            // wybranie tylko tych, których użytkownik jeszcze nie widział
            var userDistractors = userToDistracts
                .Select(ud => ud.distractor)
                .Where(d => d.type == typeStr)
                .ToList();
            var newDistractors = distractsOfType.Except(userDistractors).ToList();


            // jeżeli widział już wszystkie - pobranie najstarszej połowy
            int nDistractors = newDistractors.Count();
            if (nDistractors == 0) {
                userToDistracts.Sort((a, b) => DateTime.Compare(a.time_last_used, b.time_last_used));
                nDistractors = userToDistracts.Count();
                int nHalf = nDistractors == 1 ? 1 : nDistractors / 2;
                newDistractors = userToDistracts.Take(nHalf).Select(ud => ud.distractor).ToList();
            }

            // w bazie nie ma jeszcze dystraktorów
            if (nDistractors == 0)
                return null;

            // losowanie jednego dystraktora
            var index = (Int32)(new Random().Next() * (nDistractors - 1));
            return newDistractors[index];
        }


        // PRIVATE
        // =============================================================================================
        /* Sprawdza czy od wysłania ostatniego dystraktora do tego użytkownika
         * upłynęło wystarczająco dużo czasu, żeby wysłac mu nastepny dystraktor. 
         */
        private bool TimeForDistractor(ref List<user_distractor> userDistractors) {

            if (userDistractors.Count() == 0)
                return true;

            else {
                string timeBetweenDistrStr = ConfigurationManager.AppSettings["timeBetweenDistractors"];
                TimeSpan timeBetweenDistr = TimeSpan.FromSeconds(Int32.Parse(timeBetweenDistrStr));
                DateTime last_time = userDistractors.Max(d => d.time_last_used);

                return DateTime.Compare(DateTime.Now, last_time.Add(timeBetweenDistr)) > 0;
            }
        }
    }
}