using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace EduApi.DAL.Core
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private edumaticEntities _context;
        public Repository(edumaticEntities context)
        {
            _context = context;
        }
        private IDbSet<T> DbSet
        {
            get
            {
                return _context.Set<T>();
            }
        }

        public void Add(T entity)
        {
            DbSet.Add(entity);
            _context.SaveChanges();
        }

        public List<T> All()
        {
            return DbSet.AsQueryable().ToList();
        }

        public void Delete(int Id)
        {
            DbSet.Remove(DbSet.Find(Id));
            _context.SaveChanges();
        }

        public T Get(int Id)
        {
            return DbSet.Find(Id);
        }

        public void Update(T entity)
        {
            DbSet.Attach(entity);
            _context.SaveChanges();
        }
    }
}