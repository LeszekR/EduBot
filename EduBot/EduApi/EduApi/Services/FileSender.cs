using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace EduApi.Services {


    public enum FileRole { DISTRACTOR };

    // =================================================================================================
    public class FileSender : IHttpActionResult {

        string _fileName;
        MemoryStream fileStream;
        HttpRequestMessage _request;
        HttpResponseMessage response;


        // CONSTRUCTOR
        // =============================================================================================
        public FileSender(HttpRequestMessage request, string fileName, FileRole fileRole) {

            _fileName = PickFileAddress(fileRole) + fileName;
            _request = request;

            var fileBytes = File.ReadAllBytes(fileName);
            fileStream = new MemoryStream(fileBytes);
        }


        // PUBLIC
        // =============================================================================================
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken) {

            response = _request.CreateResponse(HttpStatusCode.OK);  
            response.Content = new StreamContent(fileStream);

            response.Content.Headers.ContentDisposition.FileName = _fileName;
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachement");
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return Task.FromResult(response);
        }


        // PRIVATE
        // =============================================================================================
        private string PickFileAddress(FileRole fileRole) {

            switch(fileRole) {
                case FileRole.DISTRACTOR:
                    return ConfigurationManager.AppSettings["distractorAddress"];
            }

            throw new DirectoryNotFoundException();
        }
    }
}