using System;
using EntityFrameworkExtras.EF6;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.MSRC.Portal.CloudSecurity.Data.Common.Models;

namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess
{
    public class ExceptionRequestRepository
    {
        private MsrcCloudDataContext dataContext;

        public ExceptionRequestRepository(MsrcCloudDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        /// <summary>
        /// Gets the exception requests for a given user
        /// </summary>
        /// <param name="emailName">
        /// The user email name
        /// </param>
        /// <returns>List of <see cref="ExceptionRequest"/> for the given user.</returns>
        public List<ExceptionRequest> GetExceptionRequestsByEmail(string emailName)
        {
            // Get the user 
            var user = this.GetUserByEmail(emailName);

            // If user is not there, then return empty list
            if (user == null)
            {
                return new List<ExceptionRequest>();
            }

            // if we have this user, let's get the ExceptionRequest records with that UserId
            var exceptionRequests = this.dataContext.ExceptionRequests.Where(er => er.UserId == user.Id).OrderByDescending(er => er.SubmittedDate);
            return exceptionRequests.ToList<ExceptionRequest>();
        }

        /// <summary>
        /// Creates Exception Request for given user.  If user does not exist it will get created first
        /// </summary>
        /// <param name="emailName">The user email name</param>
        /// <param name="fullName">The user full name</param>
        /// <param name="exceptionRequestJson">The <see cref="ExceptionRequest"/> object with values submitted by user from UI</param>
        /// <returns><see cref="ExceptionRequest"/> created</returns>
        public ExceptionRequest CreateNewRequest(string emailName, string fullName, ExceptionRequest newRequest)
        {
            // Get the user 
            var user = this.GetUserByEmail(emailName);

            // If user is not there, then add new user
            if (user == null)
            {
                var newUser = new User
                {
                    EmailName = emailName,
                    FullName = fullName
                };

                this.dataContext.Users.Add(newUser);
                this.dataContext.SaveChanges();
                user = newUser;
            }

            // Fill in the system generated values
            var status = this.dataContext.Statuses.Where(s => s.Id == 1).First();
            newRequest.SubmittedDate = DateTime.Now;
            newRequest.Status = status;
            newRequest.StatusId = 1; //Pending - TODO: Should be enum?
            newRequest.TrackingId = Guid.NewGuid();
            newRequest.UserId = user.Id;

            // Now create the Exception Request
            this.dataContext.ExceptionRequests.Add(newRequest);
            this.dataContext.SaveChanges();

            return newRequest;
        }

        /// <summary>
        /// Gets the <see cref="User"/> for a given email name
        /// </summary>
        /// <param name="emailName">
        /// The user email name
        /// </param>
        /// <returns>Th <see cref="User"/> object.</returns>
        private User GetUserByEmail(string emailName)
        {
            // Get the user 
            return this.dataContext.Users.Where(u => u.EmailName == emailName).FirstOrDefault();
        }
    }
}
