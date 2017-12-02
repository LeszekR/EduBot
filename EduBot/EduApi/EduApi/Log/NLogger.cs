using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http.Tracing;
using System.Web.Script.Serialization;

namespace EduApi.Log {
    public sealed class NLogger : System.Web.Http.Tracing.ITraceWriter
    {
        private static readonly Logger ClassLogger = LogManager.GetCurrentClassLogger();

        private static readonly Lazy<Dictionary<TraceLevel, Action<string>>> LoggingMap = new Lazy<Dictionary<TraceLevel, Action<string>>>(() => new Dictionary<TraceLevel, Action<string>> { { TraceLevel.Info, ClassLogger.Info }, { TraceLevel.Debug, ClassLogger.Debug }, { TraceLevel.Error, ClassLogger.Error }, { TraceLevel.Fatal, ClassLogger.Fatal }, { TraceLevel.Warn, ClassLogger.Warn } });

        private Dictionary<TraceLevel, Action<string>> Logger
        {
            get { return LoggingMap.Value; }
        }

        public void Trace(HttpRequestMessage request, string category, TraceLevel level, Action<TraceRecord> traceAction)
        {
            var javaScriptSerializer = new JavaScriptSerializer();
            if (level != TraceLevel.Off)
            {
                string exception = "";
                if (traceAction != null && traceAction.Target != null)
                {
                    exception = "Exception : " + objectToJSON(traceAction.Target);
                }
                var record = new TraceRecord(request, category, level);
                if(traceAction != null)
                    traceAction.Invoke(record);
                Log(record, exception);
            }
        }

        private void Log(TraceRecord record, string exception)
        {
            var message = new StringBuilder();

            if (!string.IsNullOrWhiteSpace(record.Message))
                message.Append("").Append(record.Message + Environment.NewLine);

            if (record.Request != null)
            {
                if (record.Request.Method != null)
                    message.Append("Method: " + record.Request.Method + Environment.NewLine);

                if (record.Request.RequestUri != null)
                    message.Append("").Append("URL: " + record.Request.RequestUri + Environment.NewLine);

                if (record.Request.Headers != null)
                {
                    IEnumerable<string> headerValues;
                    var keyFound = record.Request.Headers.TryGetValues("Authorization", out headerValues);
                    if (keyFound)
                        message.Append("").Append(headerValues.FirstOrDefault() + Environment.NewLine);
                }
            }

            if (!string.IsNullOrWhiteSpace(record.Category))
                message.Append("").Append(record.Category);

            if (record.Exception != null && !string.IsNullOrWhiteSpace(record.Exception.GetBaseException().Message))
            {

                message.Append("").Append("Error: " + record.Exception.GetBaseException().Message + Environment.NewLine);

                message.Append(exception);
            }

            if (!string.IsNullOrWhiteSpace(record.Operator))
                message.Append(" ").Append(record.Operator).Append(" ").Append(record.Operation);

            Logger[record.Level](Convert.ToString(message) + Environment.NewLine);
        }

        private string objectToJSON(object obj)
        {

            var serializer = new JavaScriptSerializer();
            try
            {
                return JsonConvert.SerializeObject(obj,
                            Formatting.Indented,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Include
                            });
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}