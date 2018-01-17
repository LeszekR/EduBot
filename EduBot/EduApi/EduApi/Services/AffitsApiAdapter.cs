using EduApi.Dto;
using NLog;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.SessionState;

namespace EduApi.Services {


    // =================================================================================================
    public class AffitsApiAdapter {

        private readonly AffitsApi _affitsApi;
        private readonly EmotionalStateInterpreter _emotionalStateInterpreter;
        private HttpSessionState _session;
        private Logger _logger;

        const string affitsSession = "affits_session";
        const string lastTimestamp = "last_timestamp";
        const string emoStates = "emo_states";

        const int maxResultsAmount = 5;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public AffitsApiAdapter(AffitsApi affitsApi, EmotionalStateInterpreter emotionalStateInterpreter) {
            _affitsApi = affitsApi;
            _emotionalStateInterpreter = emotionalStateInterpreter;
            _session = System.Web.HttpContext.Current.Session;
            _logger = LogManager.GetCurrentClassLogger();
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public bool processImage(string image) {
            if (_session[affitsSession] == null) {
                if (!initSession()) {
                    return false;
                }
            }
            if (!sendImage(image)) {
                return false;
            }

            return true;
        }


        // ---------------------------------------------------------------------------------------------
        public List<Pad> getResults() {

            List<Pad> pads;
            if (_session[lastTimestamp] == null || _session[affitsSession] == null) {
                return new List<Pad>();
            }
            if (_session[emoStates] == null) {
                pads = new List<Pad>();
            }
            else {
                pads = _session[emoStates] as List<Pad>;
            }

            try {
                if (!pads.Exists(p => p.timestamp == _session[lastTimestamp] as string)) {

                    string pad = _affitsApi.getResults(_session[affitsSession] as string, _session[lastTimestamp] as string);
                    EmoState? emoState = processPad(pad);

                    if (emoState != null) {
                        pads.Add(new Pad(_session[lastTimestamp] as string, (EmoState)emoState));

                        if (pads.Count > maxResultsAmount) 
                            pads.Remove(pads[0]);
                    }

                    _session[emoStates] = pads;
                }
            }
            catch (HttpRequestException e) {
                _logger.Error(e.ToString());
            }

            return pads;
        }


        // PRIVATE
        // =============================================================================================
        // TODO process actual answear when it works
        private EmoState? processPad(string pad) {
            return _emotionalStateInterpreter.interpret(pad);
        }


        // ---------------------------------------------------------------------------------------------
        private bool sendImage(string image) {
            string timestamp = getMilisecondsTimestamp();
            try {
                var pad = _affitsApi.sendImage(image, _session[affitsSession] as string, timestamp);
                _session[lastTimestamp] = timestamp;
            }
            catch (HttpRequestException e) {
                _logger.Error(e.ToString());

                return false;
            }

            return true;
        }


        // ---------------------------------------------------------------------------------------------
        private bool initSession() {
            try {
                _session[affitsSession] = _affitsApi.initSession().Trim('"');

                return true;
            }
            catch (HttpRequestException e) {
                _logger.Error(e.ToString());

                return false;
            }
        }


        // ---------------------------------------------------------------------------------------------
        private string getMilisecondsTimestamp() {
            DateTime baseDate = new DateTime(1970, 1, 1);
            TimeSpan diff = DateTime.Now - baseDate;

            return Math.Round(diff.TotalMilliseconds).ToString();
        }
    }


    // =================================================================================================
    // =================================================================================================
    public class Pad {
        public string timestamp;
        public EmoState state;


        // CONSTRUCTOR
        // =============================================================================================
        public Pad(string timestamp, EmoState state) {
            this.timestamp = timestamp;
            this.state = state;
        }
    }
}
