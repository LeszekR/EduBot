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
    
    public partial class edumodule_gamecontext
    {
        public int edumodule_id { get; set; }
        public int game_score { get; set; }
        public string game_content { get; set; }
    
        public virtual edumodule edumodule { get; set; }
    }
}
