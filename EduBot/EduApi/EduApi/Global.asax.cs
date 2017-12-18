using System;
using System.Web.SessionState;

namespace EduApi {

    public class WebApiApplication : System.Web.HttpApplication {

        protected void Application_Start() {
            //GlobalConfiguration.Configure(WebApiConfig.Register());
            //RegisterWebApiFilters(GlobalConfiguration.Configuration.Filters);
        }

        public static void RegisterWebApiFilters(System.Web.Http.Filters.HttpFilterCollection filters) {
            //filters.Add(new CredentialsActionFilter());
        }

        protected void Application_PostAuthorizeRequest(
            Object sender,
            EventArgs e
        ) {
            System.Web.HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }
    }
}
