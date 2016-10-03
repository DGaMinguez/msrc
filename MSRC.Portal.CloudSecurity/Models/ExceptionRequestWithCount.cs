// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using Microsoft.MSRC.Portal.CloudSecurity.Data.Common.Models;
using System.Collections.Generic;

namespace Microsoft.MSRC.Portal.CloudSecurity.Models
{
    public class ExceptionRequestWithCount
    {
        public int Count { get; set; }

        public IEnumerable<ExceptionRequest> Items { get; set; }
    }
}