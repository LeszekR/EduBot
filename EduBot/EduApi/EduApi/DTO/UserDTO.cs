using System;
using System.Runtime.Serialization;

namespace EduApi.DTO {
    
    [DataContract]
    public class UserDTO {

        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Login { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string Role { get; set; }
        [DataMember]
        public Nullable<int> Score { get; set; }
        [DataMember]
        public Nullable<int> Last_module { get; set; }
    }
}