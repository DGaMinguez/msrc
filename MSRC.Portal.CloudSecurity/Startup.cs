using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Microsoft.MSRC.Portal.CloudSecurity.Startup))]
namespace Microsoft.MSRC.Portal.CloudSecurity
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
