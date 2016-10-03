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
    public class Status
    {
        /// <summary>
        /// Gets or sets Id
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets Status Name
        /// </summary>
        [Index(IsUnique = true)]
        [MaxLength(10)]
        public string Name { get; set; }
    }
}