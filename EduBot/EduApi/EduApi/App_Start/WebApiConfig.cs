using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.UseDataContractJsonSerializer = true;
            
            config.MapHttpAttributeRoutes();

            //var corsAttr = new EnableCorsAttribute("*", "accept,origin,content-type,authtoken,authorization,cache-control,x-requested-with,pragma", "*");
            //config.EnableCors(corsAttr);

            var corsOrigins = "http://localhost:4200";
            var corsMethods = "*";
            var corsHeaders = 
                "Accept" +
                ",Accept-Encoding" +
                ",Accept-Language" +
                ",Authtoken" +
                ",Authorisation" +
                ",Cache-Control," +
                ",Content-Type" +
                ",Connection" +
                ",Content-Length" +
                ",Host" +
                ",Origin" +
                ",Pragma" +
                ",Referer" +
                ",User-Agent" +
                ",X-requested-with";
            corsHeaders = "*";

            config.EnableCors(new EnableCorsAttribute(corsOrigins, corsHeaders, corsMethods));

            var formatters = config.Formatters;
            formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            formatters.JsonFormatter.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
