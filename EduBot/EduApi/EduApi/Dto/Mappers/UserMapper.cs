using EduApi.DTO;

namespace EduApi.Dto.Mappers {

    public class UserMappper {

        public static UserDTO GetSimpleDTO(user entity) {
            return new UserDTO {
                Login = entity.login,
                Role = entity.role,
                Score = entity.score
            };
        }

        public static UserDTO GetDTO(user entity) {
            return new UserDTO {
                Login = entity.login,
                Role = entity.role,
                Score = entity.score
            };
        }
    }
}