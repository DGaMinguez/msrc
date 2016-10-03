// ********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess
{
    using Data.Common.Models;
    using Newtonsoft.Json.Linq;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Threading.Tasks;

    /// <summary>
    /// The MSRC Cloud dataContext interface.
    /// </summary>
    public interface IMsrcCloudDataContext
    {
        /// <summary>
        /// Gets or sets the Exception requests.
        /// </summary>
        DbSet<ExceptionRequest> ExceptionRequests { get; set; }

        /// <summary>
        /// Gets or sets the statuses.
        /// </summary>
        DbSet<Status> Statuses { get; set; }

        /// <summary>
        /// Gets or sets the volume ranges.
        /// </summary>
        DbSet<VolumeRange> VolumeRanges { get; set; }

        /// <summary>
        /// The save changes.
        /// </summary>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        int SaveChanges();

        /// <summary>
        /// The save changes async.
        /// </summary>
        /// <returns>
        /// The <see cref="Task"/>.
        /// </returns>
        Task<int> SaveChangesAsync();

        /// <summary>
        /// Gets the exception requests for a given user
        /// </summary>
        /// <param name="emailName">
        /// The user email name
        /// </param>
        /// <returns>List of <see cref="ExceptionRequest"/> for the given user.</returns>
        List<ExceptionRequest> GetExceptionRequestsByEmail(string emailName);

        /// <summary>
        /// Creates Exception Request for given user.  If user does not exist it will get created first
        /// </summary>
        /// <param name="emailName">The user email name</param>
        /// <param name="fullName">The user full name</param>
        /// <param name="exceptionRequestJson">The request submitted by user from UI</param>
        /// <returns><see cref="ExceptionRequest"/> created</returns>
        ExceptionRequest CreateNewRequest(string emailName, string fullName, JObject newRequest);
    }
}
