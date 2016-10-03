using System.Web.Mvc;
using Microsoft.MSRC.Portal.Attributes;

namespace Microsoft.MSRC.Portal.CloudSecurity
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new LocalizationAttribute("en-US"), 0);
        }
    }
}
