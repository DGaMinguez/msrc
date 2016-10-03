// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.CloudSecurity.Data.Common.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// Status class
    /// </summary>
    public class VolumeRange
    {
        /// <summary>
        /// Gets or sets Id
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets Volume range (ex. 1-100, 100-1000, etc)
        /// </summary>
        [Index(IsUnique = true)]
        [MaxLength(50)]
        public string Range { get; set; }
    }
}