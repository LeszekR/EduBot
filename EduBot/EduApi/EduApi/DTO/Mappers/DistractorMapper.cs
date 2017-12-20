
namespace EduApi.Dto.Mappers {

    public class DistractorMapper {


        // PUBLIC
        // =============================================================================================
        public static DistractorDTO GetDTO(distractor entity) {
            return new DistractorDTO {
                id = entity.id,
                type = entity.type,
                distr_content = entity.distr_content
            };
        }

        //// ---------------------------------------------------------------------------------------------
        //public static List<DistractorDTO> GetSimpleDTOList(this IEnumerable<edumodule> modules) {
        //    return modules.Select(module => GetSimpleDTO(module)).ToList();
        //}

        //// ---------------------------------------------------------------------------------------------
        //public static void CopyValues(DistractorDTO source, distractor target) {
        //    target.id = source.id;
        //    target.type = source.type;
        //    target.distr_content = source.distr_content;
        //}
    }
}
