using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;

namespace EduApi.DAL {


    // =================================================================================================
    public class DistractorRepository : Repository<distractor>, IDistractorRepository {


        // CONSTRUCTOR
        // =============================================================================================
        public DistractorRepository(edumaticEntities context) : base(context) {}


        // PUBLIC
        // =============================================================================================
        //public static int SortDistractors(distractor a, distractor b) {
        //    if (a.group_position != b.group_position)
        //        return a.group_position > b.group_position ? 1 : -1;
        //    return a.id > b.id ? 1 : -1;
        //}
    }
}