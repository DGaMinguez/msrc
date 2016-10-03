// ********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.CloudSecurity.Data.Common.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// The exception request.
    /// </summary>
    public class ExceptionRequest
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExceptionRequest"/> class.
        /// </summary>
        public ExceptionRequest()
        {
        }

        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the submitted date.
        /// </summary>
        public DateTime SubmittedDate { get; set; }

        /// <summary>
        /// Gets or sets the Azure Subscription Id.
        /// </summary>
        public Guid SubscriptionId { get; set; }

        /// <summary>
        /// Gets or sets the status.
        /// </summary>
        public virtual Status Status { get; set; }

        /// <summary>
        /// Gets or sets the status id.
        /// </summary>
        public int StatusId { get; set; }

        /// <summary>
        /// Gets or sets the status name.
        /// </summary>
        [NotMapped]
        public string StatusName { get; set; }

        /// <summary>
        /// Gets or sets the contact email.
        /// </summary>
        [MaxLength(100)]
        public string ContactEmail { get; set; }

        /// <summary>
        /// Gets or sets the expected volume.
        /// </summary>
        public virtual VolumeRange ExpectedVolume { get; set; }

        /// <summary>
        /// Gets or sets the volume range id.
        /// </summary>
        public int ExpectedVolumeId { get; set; }

        /// <summary>
        /// Gets or sets the IP addresses - comma separated list.
        /// </summary>
        [MaxLength(500)]
        public string IPAddresses { get; set; }

        /// <summary>
        /// Gets or sets the justification.
        /// </summary>
        [MaxLength(500)]
        public string Justification { get; set; }

        /// <summary>
        /// Gets or sets the comment - for approved/rejected.
        /// </summary>
        [MaxLength(500)]
        public string Comment { get; set; }

        /// <summary>
        /// Gets or sets the tracking Id.
        /// </summary>
        public Guid TrackingId { get; set; }

        /// <summary>
        /// Gets or sets the user.
        /// </summary>
        public virtual User User { get; set; }

        /// <summary>
        /// Gets or sets the user id.
        /// </summary>
        public int UserId { get; set; }
    }
}