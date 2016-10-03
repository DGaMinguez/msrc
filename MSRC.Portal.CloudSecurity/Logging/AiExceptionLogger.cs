// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.Logging
{
    using System.Web.Http.ExceptionHandling;
    using Microsoft.ApplicationInsights;

    /// <summary>
    /// Application Insights Exception logger class
    /// </summary>
    public class AiExceptionLogger : ExceptionLogger
    {
        private static TelemetryClient telemetryClient = new TelemetryClient();       

        /// <summary>
        /// Logs exception
        /// </summary>
        /// <param name="context"></param>
        public override void Log(ExceptionLoggerContext context)
        {
            if (context != null && context.Exception != null)
            {              
                telemetryClient.TrackException(context.Exception);
            }

            base.Log(context);
        }
    }
}