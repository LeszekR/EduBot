using EduApi.DTO;

namespace EduApi.Dto.Mappers {

    public class UserMappper {

        public static UserDTO GetSimpleDTO(user entity) {
            return new UserDTO {
                Login = entity.login,
                Role = entity.role,
                Score = entity.score,
                Id = entity.id,
                Last_module = entity.last_module
            };
        }

        public static UserDTO GetDTO(user entity) {
            return GetSimpleDTO(entity);
        }

        public static void MapDtoToEntity(UserDTO dto, user entity)
        {
            entity.login = dto.Login;
            if (dto.Password != null)
                entity.password = dto.Password;
        }
    }
}