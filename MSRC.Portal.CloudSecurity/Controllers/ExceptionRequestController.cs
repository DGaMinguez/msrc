using Microsoft.MSRC.Portal.CloudSecurity.DataAccess;
using Microsoft.MSRC.Portal.CloudSecurity.Models;
using Microsoft.MSRC.Portal.CloudSecurity.Providers;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Microsoft.MSRC.Portal.CloudSecurity.Controllers
{
    /// <summary>
    /// The Email Exception Request controller.
    /// </summary>
    [Authorize]
    [RoutePrefix("api/exception-request")]
    public class ExceptionRequestController : ApiController
    {
        /// <summary>
        /// The data context.
        /// </summary>
        private readonly IMsrcCloudDataContext dataContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionRequestController"/> class.
        /// </summary>
        /// <param name="dataContext">
        /// The data context.
        /// </param>
        public ExceptionRequestController(IMsrcCloudDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        /// <summary>
        /// Get exception requests for logged in user
        /// </summary>
        /// <param name="dataContext">
        /// The data context.
        /// </param>
        [HttpGet]
        [Route("requests")]
        public IHttpActionResult GetUserExceptionRequests()
        {
            var emailClaimValue = ClaimProvider.GetEmailClaim(User);

            var values = this.dataContext.GetExceptionRequestsByEmail(emailClaimValue);

            var result = new ExceptionRequestWithCount
            {
                Items = values,
                Count = values.Count()
            };

            return Ok(result);
        }

        /// <summary>
        /// Save the exception request for User
        /// </summary>
        /// <returns>
        /// <param name="exceptionRequestJson">JSON representing the exception request submitted by user</param>
        /// The <see cref="IHttpActionResult"/>.
        /// </returns>
        [Route("request")]
        [HttpPut]
        [Authorize]
        public IHttpActionResult CreateNewRequest(FormDataCollection form)
        {
            var emailName = ClaimProvider.GetEmailClaim(User);
            var fullName = ClaimProvider.GetFullNameClaim(User);

            var exceptionReq = JObject.Parse(form.ToArray()[0].Key);
            var newRequest = this.dataContext.CreateNewRequest(emailName, fullName, exceptionReq);

            return Ok(newRequest);
        }
    }
}
