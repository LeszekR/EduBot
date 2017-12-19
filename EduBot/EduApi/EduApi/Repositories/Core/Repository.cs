﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;

namespace EduApi.DAL.Core {


    // =================================================================================================
    public class Repository<T> : IRepository<T> where T : class {

        //private edumaticEntities _context;
        protected edumaticEntities _context;


        // CONSTRUCTOR
        // =============================================================================================
        public Repository(edumaticEntities context) {
            _context = context;
            _context.Database.Log = LogAll;
        }

        // ---------------------------------------------------------------------------------------------
        private void LogAll(string s) {
            System.Diagnostics.Debug.WriteLine(s);
        }

        // ---------------------------------------------------------------------------------------------
        private IDbSet<T> DbSet {
            get { return _context.Set<T>(); }
        }


        // PUBLIC
        // =============================================================================================
        public T Add(T entity) {

            try {
                DbSet.Add(entity);
                _context.SaveChanges();
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException updEx) {
                string message = string.Format("Update exception: {0}, {1}",
                    updEx.Data.ToString(),
                    updEx.Message);
                LogAll(message);
            }
            catch (DbEntityValidationException dbEx) {

                Exception raise = dbEx;

                foreach (var validationErrors in dbEx.EntityValidationErrors) {
                    foreach (var validationError in validationErrors.ValidationErrors) {
                        string message = string.Format(
                            "{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);

                        // raise a new exception nesting the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }

            return entity;
        }

        // ---------------------------------------------------------------------------------------------
        public List<T> All() {
            return DbSet.AsQueryable().ToList();
        }

        // ---------------------------------------------------------------------------------------------
        public void Delete(int Id) {
            DbSet.Remove(DbSet.Find(Id));
            _context.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public T Get(int Id) {
            return DbSet.Find(Id);
        }

        // ---------------------------------------------------------------------------------------------
        public void Update(T entity) {
            DbSet.Attach(entity);
            _context.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public void SaveChanges() {
            _context.SaveChanges();
        }
    }
}