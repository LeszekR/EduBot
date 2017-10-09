using System;
using EduApi.Models;
using System.Runtime.Serialization;

namespace EduApi.DTO {

    // -------------------------------------------------------------------------------------------------
    [DataContract]
    public class UserDTO {

        [DataMember]
        string Login { get; set; }

        [DataMember]
        string Role { get; set; }

        [DataMember]
        public Nullable<int> Score { get; set; }

        public UserDTO(user userFromDB) {
            Login = userFromDB.login;
            Role = userFromDB.role;
            Score = userFromDB.score;
        }
    }
}