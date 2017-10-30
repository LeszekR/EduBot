using EduApi.DTO;

namespace EduApi.Dto.Mappers
{
    public class ModuleMappper
    {
        public static ModuleDTO GetSimpleDTO(edumodule entity)
        {
            return new ModuleDTO
            {
                id = entity.id,
                title = entity.title
            };
        }

        public static ModuleDTO GetDTO(edumodule entity)
        {
            return new ModuleDTO
            {
                id = entity.id,
                title = entity.title,
                difficulty = entity.difficulty,
                content = entity.content,
                example = entity.example
            };
        }
        
    }
}