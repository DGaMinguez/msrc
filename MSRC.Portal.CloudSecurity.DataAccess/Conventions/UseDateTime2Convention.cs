// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using System;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Microsoft.MSRC.Portal.CloudSecurity.DataAccess.Conventions
{
    /// <summary>
    /// Let EntityFramework know that we want all C# DateTime items to be treated as datetime2 in SQL
    /// </summary>
    public class UseDateTime2Convention : Convention
    {
        public UseDateTime2Convention() 
        { 
            this.Properties<DateTime>() 
                .Configure(c => c.HasColumnType("datetime2"));         
        } 
    }
}
