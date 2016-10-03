using System.Web.Mvc;

namespace Microsoft.MSRC.Portal.CloudSecurity.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}