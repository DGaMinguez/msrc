// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/

using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.MSRC.Portal.CloudSecurity.DataAccess;
using System.Reflection;
using System.Web.Http;

namespace Microsoft.MSRC.Portal.CloudSecurity.App_Start
{
    public class DependencyConfig
    {
        public static void Configure(HttpConfiguration config)
        {                      
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<MsrcCloudDataContext>().As<IMsrcCloudDataContext>();
            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = resolver;
        }
    }
}