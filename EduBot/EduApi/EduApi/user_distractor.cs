//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EduApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class user_distractor
    {
        public int user_id { get; set; }
        public int distractor_id { get; set; }
        public System.DateTime time_last_used { get; set; }
    
        public virtual distractor distractor { get; set; }
        public virtual user user { get; set; }
    }
}