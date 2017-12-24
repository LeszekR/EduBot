
namespace EduApi.Dto.Mappers {

    public class DistractorMapper {


        // PUBLIC
        // =============================================================================================
        public static DistractorDTO GetDTO(distractor entity) {
            return new DistractorDTO {
                //id = entity.id,
                //type = entity.type,
                distr_content = entity.distr_content
            };
        }
    }
}
