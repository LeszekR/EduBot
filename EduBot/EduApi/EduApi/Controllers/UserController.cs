﻿using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EduApi.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        #region Constructor
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        #endregion

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetData()
        {
            return Ok(_userService.GetUsers());
        }
    }
}
