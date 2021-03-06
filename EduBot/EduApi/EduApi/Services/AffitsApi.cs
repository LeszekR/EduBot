﻿using Newtonsoft.Json.Linq;
using NLog;
using System.Net.Http;

namespace EduApi.Services {


    // =================================================================================================
    public class AffitsApi {

        private readonly string apiHost = "http://153.19.52.107/AffitsServer";

        private readonly string initEndpoint = "/init";
        private readonly string sendImageEnpoint = "/{session_id}/{timestamp}/send/image";
        private readonly string resultsEndpoint = "/{session_id}/{timestamp}/results";

        private HttpClient _httpClient;
        private Logger _logger;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public AffitsApi() {
            _httpClient = new HttpClient();
            _logger = LogManager.GetCurrentClassLogger();
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public string sendImage(string image, string sessionId, string milisecondsTimestamp, int userId) {
            dynamic payload = new JObject();
            payload.image = image;
            StringContent content = new StringContent(payload.ToString());
            string url = parseUrl(sendImageEnpoint, sessionId, milisecondsTimestamp);

            HttpResponseMessage response = _httpClient.PostAsync(url, content).Result;
            response.EnsureSuccessStatusCode();

            HttpContent responseContent = response.Content;
            string responseString = responseContent.ReadAsStringAsync().Result;
            log(userId, url, responseString);

            return responseString;
        }


        // ---------------------------------------------------------------------------------------------
        public string initSession(int userId) {
            HttpResponseMessage response = _httpClient.GetAsync(apiHost + initEndpoint).Result;
            response.EnsureSuccessStatusCode();

            HttpContent responseContent = response.Content;
            string responseString = responseContent.ReadAsStringAsync().Result;
            log(userId, apiHost + initEndpoint, responseString);

            return responseString;
        }


        // ---------------------------------------------------------------------------------------------
        public string getResults(string sessionId, string milisecondsTimestamp, int userId) {
            string url = parseUrl(resultsEndpoint, sessionId, milisecondsTimestamp);

            HttpResponseMessage response = _httpClient.GetAsync(url).Result;
            response.EnsureSuccessStatusCode();

            HttpContent responseContent = response.Content;
            string responseString = responseContent.ReadAsStringAsync().Result;
            log(userId, url, responseString);

            return responseString;
        }


        // PRIVATE
        // =============================================================================================
        private string parseUrl(string path, string sessionId, string milisecondsTimestamp) {
            path = path.Replace("{session_id}", sessionId);
            path = path.Replace("{timestamp}", milisecondsTimestamp);

            return apiHost + path;
        }


        // ---------------------------------------------------------------------------------------------
        private void log(int userId, string url, string response) {
            _logger.Debug("User: " + userId + "|" + url + " request with response: \"" + response + "\"");
        }
    }
}
