﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class edumaticEntities : DbContext
    {
        public edumaticEntities()
            : base("name=edumaticEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<distractor> distractor { get; set; }
        public virtual DbSet<edumodule> edumodule { get; set; }
        public virtual DbSet<edumodule_gamecontext> edumodule_gamecontext { get; set; }
        public virtual DbSet<enum_diff_level> enum_diff_level { get; set; }
        public virtual DbSet<enum_user_role> enum_user_role { get; set; }
        public virtual DbSet<test_code> test_code { get; set; }
        public virtual DbSet<test_question> test_question { get; set; }
        public virtual DbSet<user> user { get; set; }
        public virtual DbSet<user_distractor> user_distractor { get; set; }
        public virtual DbSet<user_code> user_code { get; set; }
        public virtual DbSet<user_question> user_question { get; set; }
    }
}
