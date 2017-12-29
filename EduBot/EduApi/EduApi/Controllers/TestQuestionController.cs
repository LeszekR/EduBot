﻿using EduApi.Dto;
using EduApi.Services.Interfaces;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {

    public class TestQuestionController : ApiController {

        private readonly ITestQuestionService _questionService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public TestQuestionController(ITestQuestionService questionService) {
            _questionService = questionService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult VerifyClosedTest([FromBody]TestQuestionAnswDTO[] answers) {
            int userId = 1;
            return Ok(_questionService.VerifyClosedTest(answers, userId));
        }
    }
}