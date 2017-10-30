using System;
using System.Runtime.Serialization;

namespace EduApi.DTO {
    
    [DataContract]
    public class UserDTO {

        [DataMember]
        public string Login { get; set; }

        [DataMember]
        public string Role { get; set; }

        [DataMember]
        public Nullable<int> Score { get; set; }

    }
}