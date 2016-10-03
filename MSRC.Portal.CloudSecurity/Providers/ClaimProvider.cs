// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

namespace Microsoft.MSRC.Portal.CloudSecurity.Providers
{
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Principal;


    internal static class ClaimProvider
    {
        private static string emailClaimsType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
        private static string preferredUserNameClaimsType = "preferred_username";


        public static string GetEmailClaim(IPrincipal User)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var emailClaimValue = (from c in claimsIdentity.Claims
                                   where c.Type == emailClaimsType
                                   select c.Value).SingleOrDefault();


            if (!string.IsNullOrEmpty(emailClaimValue))
            {
                return emailClaimValue;
            }

            emailClaimValue = (from c in claimsIdentity.Claims
                               where c.Type == preferredUserNameClaimsType
                               select c.Value).SingleOrDefault();

            return emailClaimValue;
        }

        public static string[] GetNameClaim(IPrincipal User)
        {
            return (from c in ((ClaimsIdentity)User.Identity).Claims
                    where c.Type == "name"
                    select c.Value).Single().Split(' ');
        }

        public static string GetFullNameClaim(IPrincipal User)
        {
            return (from c in ((ClaimsIdentity)User.Identity).Claims
                    where c.Type == "name"
                    select c.Value).Single();
        }
    }
}