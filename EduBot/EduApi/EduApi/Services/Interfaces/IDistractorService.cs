using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services {

    public interface IDistractorService {

        // ---------------------------------------------------------------------------------------------
        /* 1. Sprawdza, czy od ostatniego dystraktora upłynęło wystarczająco dużo czasu.
         *    (interwał określa parametr: Web.config/appSettings/timeBetweenDistractors)
         * 2. Jeśli czas upłynął - pobiera losowo jeden z dystraktorów wymaganego typu, spośród tych, 
         *    które jeszcze nie były wysłane do użytkownika.
         * 3. Jeśli wszystkie zostały już wysłane - pobiera któryś z wysłanych wcześniej, losując
         *    go z najstarszej połowy.
         */
        void UpsertUserDistractor(user user, distractor distractor);

        // ---------------------------------------------------------------------------------------------
        /* 1. Sprawdza, czy od ostatniego dystraktora upłynęło wystarczająco dużo czasu.
         *    (interwał określa parametr: Web.config/appSettings/timeBetweenDistractors)
         * 2. Jeśli czas upłynął - pobiera losowo jeden z dystraktorów wymaganego typu, spośród tych, 
         *    które jeszcze nie były wysłane do użytkownika.
         * 3. Jeśli wszystkie zostały już wysłane - pobiera któryś z wysłanych wcześniej, losując
         *    go z najstarszej połowy.
         */
        distractor NextDistractor(int userId, DistractorType type);
        }
    }