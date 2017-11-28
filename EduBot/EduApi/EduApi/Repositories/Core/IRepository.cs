using System.Collections.Generic;
using System.Data.Entity;

namespace EduApi.DAL.Core {

    public interface IRepository<T> where T : class {

        T Add(T entity);
        void Delete(int id);
        void Update(T entity);
        List<T> All();
        T Get(int Id);

        /* Metoda dodana dlatego, że attach() wołana w Update() nie działa. 
         * Z tego powodu aktualizację danych obiektu należy wykonać poprzez 
         * zmianę jego danych, a następnie wywołanie SaveChanges().
         */
        void SaveChanges();
    }
}
