using EduApi.DAL;
using EduApi.DAL.Interfaces;
using EduApi.Repositories;
using EduApi.Repositories.Interfaces;
using EduApi.Services;
using EduApi.Services.Interfaces;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using System.Web.Http;

namespace EduApi.App_Start {

    public static class DepentencyInjectorConfig
    {
        public static Container Init(HttpConfiguration config)
        {
            var container = new Container();

            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            // Register your types, for instance using the scoped lifestyle:
            container.Register<edumaticEntities, edumaticEntities>(Lifestyle.Scoped);

            container.Register<IUserRepository, UserRepository>(Lifestyle.Scoped);
            container.Register<IUserService, UserService>(Lifestyle.Scoped);

            container.Register<IModuleRepository, ModuleRepository>(Lifestyle.Scoped);
            container.Register<IModuleService, ModuleService>(Lifestyle.Scoped);

            container.Register<ITestQuestionRepository, TestQuestionRepository>(Lifestyle.Scoped);
            container.Register<ITestQuestionService, TestQuestionService>(Lifestyle.Scoped);

            //container.Register<IUserQuestionRepository, UserQuestionRepository>(Lifestyle.Scoped);
            //container.Register<IUserQuestionService, UserQuestionService>(Lifestyle.Scoped);

            // This is an extension method from the integration package.
            container.RegisterWebApiControllers(config);

            container.Verify();

            return container;
        }
    }
}