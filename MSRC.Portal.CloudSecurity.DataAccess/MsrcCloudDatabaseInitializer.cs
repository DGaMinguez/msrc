// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using Microsoft.MSRC.Portal.CloudSecurity.Data.Common.Models;

namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess
{
    /// <summary>
    /// The msrc cloud database initializer.
    /// </summary>
    public class MsrcCloudDatabaseInitializer : CreateDatabaseIfNotExists<MsrcCloudDataContext>
    {
        /// <summary>
        /// Populates table with lookup data
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        protected override void Seed(MsrcCloudDataContext context)
        {
            Initialize(context);
        }

        /// <summary>
        /// The initializes lookup tables
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        internal static void Initialize(MsrcCloudDataContext context)
        {
            InitializeStatus(context);
            InitializeVolumeRange(context);
        }

        /// <summary>
        /// Initialize exploitability indexes.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        private static void InitializeStatus(MsrcCloudDataContext context)
        {
            List<Status> statuses = new List<Status>
            {
                new Status {Id = 1, Name = "Pending"},
                new Status {Id = 2, Name = "Approved"},
                new Status {Id = 3, Name = "Rejected"}
            };

            statuses.ForEach(status => context.Statuses.AddOrUpdate(imp => imp.Name, status));
            context.SaveChanges();
        }

        /// <summary>
        /// Initialize denial of service exploitability.
        /// </summary>
        /// <param name="context">
        /// The context.
        /// </param>
        private static void InitializeVolumeRange(MsrcCloudDataContext context)
        {
            List<VolumeRange> volumeRanges = new List<VolumeRange>
            {
                new VolumeRange {Id = 1, Range = "1-100"},
                new VolumeRange {Id = 2, Range = "100-1,000"},
                new VolumeRange {Id = 3, Range = "1,000-100,000"},
                new VolumeRange {Id = 4, Range = "100,000+"}
            };

            volumeRanges.ForEach(volumeRange => context.VolumeRanges.AddOrUpdate(sev => sev.Range, volumeRange));
            context.SaveChanges();
        }
    }
}
