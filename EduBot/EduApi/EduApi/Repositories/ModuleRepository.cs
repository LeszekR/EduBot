﻿using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;

namespace EduApi.DAL {


    // =================================================================================================
    public class ModuleRepository : Repository<edumodule>, IModuleRepository {


        // CONSTRUCTOR
        // =============================================================================================
        public ModuleRepository(edumaticEntities context) : base(context) {}


        // PUBLIC
        // =============================================================================================
        //public List<edumodule> SelectChildren(int? id_grupy) {
        //    var modules = _context.edumodule.Where(mod => mod.group_id == id_grupy).ToList();
        //    modules.Sort((a, b) => SortModules(a, b));
        //    return modules;
        //}

        //// ---------------------------------------------------------------------------------------------
        public void SetNewValues(ModuleDTO source, edumodule result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }

        //// ---------------------------------------------------------------------------------------------
        //public static int SortModules(edumodule a, edumodule b) {
        //    if (a.group_position != b.group_position)
        //        return a.group_position > b.group_position ? 1 : -1;
        //    return a.id > b.id ? 1 : -1;
        //}
    }
}