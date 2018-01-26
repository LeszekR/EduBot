using EduApi.Dto;
using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    public interface IEduAlgorithmService {

        // ---------------------------------------------------------------------------------------------
        /* Oblicza i wysyła:
         * 1. progres = procent modułów wyświetlonych do tej pory
         * 2. correctAnswers = procent prawidłowych wśród wszystkich udzielonych odpowiedzi
         *    (na podstawie ostatniej odp. do każdego pytania, na które użytkownik już odpowiedział;
         *    pomija pytania, których na razie nie otrzymał.)
         */
        GameScoreDTO GetScore(int userId);

        // ---------------------------------------------------------------------------------------------
        /* 1. Interpretuje ostatnie emostany - na tej podst. ustala aktualny stan ucznia
         * 2. Określa czy emostan wymaga dystraktora
         * 3. Jesli tak - sprawdza kiedy wysłano ostatni dystraktor
         * 4. Jeśli dystraktor jest wymagany i już czas na nowy - wybiera dystraktor z bazy
         * 5. Wysyła dystraktor (jeśli potrzebny) lub null
         */
        DistractorDTO KickTheStudent(int userId, List<Pad> lastEmoStates);

        // ---------------------------------------------------------------------------------------------
        /* Wysyła moduły łatwiejsze składające się na wskazany moduł trudniejszy.
         * Front wywołuje ten endpoint pod warunkiem, że oglądany moduł nie jest  
         * modułem o najniższym poziomie trudności (difficulty != 'easy').
         */
        List<ModuleDTO> ExplainModule(int userId, int moduleId);

        // ---------------------------------------------------------------------------------------------
        /* 1. Na podstawie postępów użytkownika decyduje który moduł powinien zostać teraz podany
         * 2. Jeżeli aktualnie oglądany to najnowszy z pokazanych użytkownikowi - określa jaki przysłać 
         *    na podstawie stanu emocjonalnego oraz wyników ucznia
         * 3. Jeżeli wcześniej użytkownik wcisnął 'wstecz' - wysyła ten, który przedtem podano jako następny
         *    po aktualnie wyświetlanym
         * 4. Wysyła wybrany moduł do frontu
         */
        ModuleAndDistractorDTO NextModule(int userId, int currentModuleId, List<Pad> lastEmoStates);

        // ---------------------------------------------------------------------------------------------
        /* Wysyła do frontu moduł znajdujący się w kolejności przed
         * modułem oglądanym w tej chwili.
         * Jeśli użytkownik jeszcze nie otrzymał żadnych modułów - wysyła null.
         */
        ModuleAndDistractorDTO PrevModule(int userId, int currentModuleId);
    }
}
