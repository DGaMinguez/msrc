// ********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess
{
    using Conventions;
    using Data.Common.Models;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Diagnostics;

    /// <summary>
    /// The MSRC Data Context.
    /// </summary>
    public class MsrcCloudDataContext : DbContext, IMsrcCloudDataContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MsrcCloudDataContext"/> class.
        /// </summary>
        public MsrcCloudDataContext() : this("Name=MsrcCloudDataContext")
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MsrcCloudDataContext"/> class.
        /// </summary>
        /// <param name="connectionString">
        /// The msrc db connection str.
        /// </param>
        public MsrcCloudDataContext(string connectionString)
            : base(connectionString)
        {
#if DEBUG
            Database.Log = message => Debug.WriteLine(message);
#endif
        }

        /// <summary>
        /// Gets or sets the exception requests.
        /// </summary>
        public DbSet<ExceptionRequest> ExceptionRequests { get; set; }

        /// <summary>
        /// Gets or sets the statuses.
        /// </summary>
        public DbSet<Status> Statuses { get; set; }

        /// <summary>
        /// Gets or sets the users.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Gets or sets the volume ranges.
        /// </summary>
        public DbSet<VolumeRange> VolumeRanges { get; set; }

        /// <summary>
        /// The on model creating.
        /// </summary>
        /// <param name="modelBuilder">
        /// The model builder.
        /// </param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Add(new UseDateTime2Convention());
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
            var exceptionRequests = new ExceptionRequestRepository(this).GetExceptionRequestsByEmail(emailName);
            return exceptionRequests;
        }

        /// <summary>
        /// Creates Exception Request for given user.
        /// </summary>
        /// <param name="emailName">The user email name</param>
        /// <param name="fullName">The user full name</param>
        /// <param name="exceptionRequestJson">The request submitted by user from UI</param>
        /// <returns><see cref="ExceptionRequest"/> created</returns>
        public ExceptionRequest CreateNewRequest(string emailName, string fullName, JObject exceptionRequestJson)
        {
            // TODO: Validate SubscriptionId??  Others??
            Guid subsId;
            if (!Guid.TryParse(exceptionRequestJson["subscriptionId"].ToString(), out subsId))
            {
                subsId = Guid.Empty;
            }

            // Fill in properties that can be passed by User from UI
            var newRequest = new ExceptionRequest
            {
                SubscriptionId = subsId,
                ContactEmail = exceptionRequestJson["contactEmail"].ToString(),
                ExpectedVolumeId = int.Parse(exceptionRequestJson["expectedVolumeId"].ToString()),
                IPAddresses = exceptionRequestJson["ipAddresses"].ToString(),
                Justification = exceptionRequestJson["justification"].ToString()
            };

            var exceptionRequest = new ExceptionRequestRepository(this).CreateNewRequest(emailName, fullName, newRequest);
            return exceptionRequest;
        }
    }
}
