// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using Microsoft.MSRC.Portal.CloudSecurity.Models;
using Microsoft.MSRC.Portal.CloudSecurity.Providers;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Configuration;
using System.IdentityModel.Tokens;

namespace Microsoft.MSRC.Portal.CloudSecurity
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            TokenValidationParameters tokenparams = new TokenValidationParameters()
            {
                ValidAudience = ConfigurationManager.AppSettings["ida:Audience"],
                ValidateIssuer = Convert.ToBoolean(ConfigurationManager.AppSettings["ida:ValidateIssuer"])
            };

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions
            {
                AccessTokenFormat = new Owin.Security.Jwt.JwtFormat(tokenparams, new OpenIdConnectCachingSecurityTokenProvider(ConfigurationManager.AppSettings["ida:TokenProviderUrl"])),
            });

            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
        }
    }
}
