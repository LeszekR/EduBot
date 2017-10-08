using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using EduApi.DTO;
using EduApi.Models;

namespace EduApi.Controllers
{
    public class ServerController : ApiController
    {
        // GET: EduBotServer
        [HttpGet]
        //public ActionResult Index() { 
        public IHttpActionResult Index() {
            return Ok("<h3>Serwer Edu Api pracuje.</h3>");
        }
    }
}