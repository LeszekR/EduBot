using System.Collections.Generic;
using EduApi.DAL.Interfaces;
using EduApi.Services.Interfaces;
using System.Linq;
using System;
using System.Configuration;
using NLog;
using EduApi.Dto;
using EduApi.Dto.Mappers;

namespace EduApi.Services {


    // =================================================================================================
    public class DistractorService : IDistractorService {

        private readonly IUserService _userService;
        private readonly IDistractorRepository _distractorRepository;
        private Logger _logger;

        public static readonly string KICK = "kick";
        public static readonly string REWARD = "reward";



        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public DistractorService(
            IUserService userService,
            IDistractorRepository distractorRepository) {

            _userService = userService;
            _distractorRepository = distractorRepository;
            _logger = LogManager.GetCurrentClassLogger();
        }
        #endregion


        // MOCK
        // =============================================================================================
        public DistractorDTO MockDistractor(int userId, DistractorType distrType) {

            // backing time of last use for all distractors of the user
            var userDistractors = _userService.GetUserEntity(userId).user_distractor.ToList();
            foreach (var ud in userDistractors)
                ud.time_last_used = ud.time_last_used.AddMinutes(-10);

            // picking next distractor of required type
            var distractor = NextDistractor(userId, distrType);
            return DistractorMapper.GetDTO(distractor);
        }


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
            List<user_distractor> userDistractsAll = user.user_distractor.ToList();


            // nie wysyłamy dystraktora
            if (type == DistractorType.NO_DISTRACTOR)
                return null;


            // ostatni dystraktor był wysłany zbyt niedawno, trzeba jeszcze poczekać z następnym
            if (!TimeForDistractor(ref userDistractsAll)) {
                _logger.Debug("Not providing a distractor as user (" + userId + ") had one quiet recently.");

                return null;
            }


            // już czas na nastepny dystraktor
            string typeStr = "";
            if (type == DistractorType.KICK)
                typeStr = KICK;
            else if (type == DistractorType.REWARD)
                typeStr = REWARD;


            // pobranie wszystkich dystraktorów wymaganego typu
            var distractsAll = _distractorRepository.All().ToList();
            var distractsOfTypeAll = distractsAll.Where(d => d.type == typeStr).ToList();


            // wybranie tylko tych, których użytkownik jeszcze nie widział
            var userDistractsOfType = userDistractsAll
                .Select(ud => ud.distractor)
                .Where(d => d.type == typeStr)
                .ToList();
            var unseenDistracts = distractsOfTypeAll.Except(userDistractsOfType).ToList();
            int nDistracts = unseenDistracts.Count();


            // jeżeli widział już wszystkie - pobranie najstarszej połowy
            if (nDistracts == 0) {
                nDistracts = userDistractsOfType.Count();
                nDistracts = nDistracts == 1 ? 1 : nDistracts / 2;

                unseenDistracts = userDistractsAll
                    .OrderBy(a => a.time_last_used)
                    .Select(ud => ud.distractor)
                    .Where(d => d.type == typeStr)
                    .Take(nDistracts)
                    .ToList();
            }

            // w bazie nie ma jeszcze dystraktorów
            if (nDistracts == 0)
                return null;

            // losowanie jednego dystraktora
            var index = (Int32)(new Random().Next(0, nDistracts));
            var newDistractor = unseenDistracts[index];


            // Dopisanie kolejnego dystraktora do litsy wysłanych użytkownikowi
            // lub zaktualizowanie timestamp z chwili jego wysłania, jesli jest wysyłany po raz kolejny.
            UpsertUserDistractor(user, newDistractor);


            _logger.Info("Distractor of type \"" + newDistractor.type + "\" was drawn for a user (" + userId + ") with content: " + newDistractor.distr_content);
            return newDistractor;
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