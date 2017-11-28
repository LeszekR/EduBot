using EduApi.App_Start;
using EduApi.Log;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SimpleInjector.Integration.WebApi;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi {
    public static class WebApiConfig
    {
        public static HttpConfiguration Register()
        {
            var config = new HttpConfiguration();

            config.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(DepentencyInjectorConfig.Init(config));
            config.Filters.Add(new GlobalExceptionFilter());

            config.MapHttpAttributeRoutes();

            var corsOrigins = "*";
            var corsHeaders = "*";
            var corsMethods = "GET, POST, PUT, DELETE, OPTIONS";
            //var corsHeaders =
            //    "Accept" +
            //    ",Accept-Encoding" +
            //    ",Accept-Language" +
            //    ",Authtoken" +
            //    ",Authorisation" +
            //    ",Cache-Control," +
            //    ",Content-Type" +
            //    ",Connection" +
            //    ",Content-Length" +
            //    ",Host" +
            //    ",Origin" +
            //    ",Pragma" +
            //    ",Referer" +
            //    ",User-Agent" +
            //    ",X-requested-with";

            var corsAttr = new EnableCorsAttribute(corsOrigins, corsHeaders, corsMethods);
            config.EnableCors(corsAttr);

            var formatters = config.Formatters;
            formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional, action = RouteParameter.Optional }
            );

            return config;
        }
    }
}
