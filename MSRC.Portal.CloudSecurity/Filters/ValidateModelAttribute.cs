// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Microsoft.MSRC.Portal.Models;

namespace Microsoft.MSRC.Portal.Filters
{

    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (!actionContext.ModelState.IsValid)
            {
                var errors = actionContext.ModelState
                      .Where(e => e.Value.Errors.Count > 0)
                      .Select(e => new ValidationError
                      {
                          Name = e.Key,
                          Message = e.Value.Errors.First().ErrorMessage
                      }).ToArray();

                var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new ObjectContent<ValidationError[]>(errors, new JsonMediaTypeFormatter())
                };

                actionContext.Response = response;
            }
        }
    
    }
}