using System.Collections.Generic;
using System.Data.Entity;

namespace EduApi.DAL.Core
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void Delete(int id);
        void Update(T entity);
        List<T> All();
        T Get(int Id);
    }
}
