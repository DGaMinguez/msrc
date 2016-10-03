using System.Web.Optimization;

namespace Microsoft.MSRC.Portal.CloudSecurity
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/applicationInsights")
                .Include("~/Scripts/ai.*"));

            bundles.Add(new LessBundle("~/bundles/less")
                .Include("~/Content/msrc-portal.less"));
            bundles.Add(new StyleBundle("~/content/css")
                .Include("~/Content/themes/base/jquery-ui.css")
                .Include("~/Content/font-awesome.css")
                .Include(
                    "~/Content/Style/BulletinCss.css",
                    "~/Content/Style/Combined_technet.css",
                    "~/Content/msrc-portal.css"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include(
                    "~/Scripts/jquery-3.1.0.js",
                    "~/Scripts/jquery-ui-1.12.1.js"
                    ));

            // all third party application and framework bundles - Sequence needs to be maintained as below
            bundles.Add(new ScriptBundle("~/bundles/alljsbase")
                .Include("~/Scripts/bootstrap.js")
                .Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-*"
                )
                .IncludeDirectory("~/Scripts/angular-ui/", "*.js", true)
                .Include(
                    "~/Scripts/FileSaver.js",
                    "~/Scripts/sprintf.js",
                    "~/Scripts/angular-sprintf.js",
                    "~/Scripts/adal.js",
                    "~/Scripts/adal-angular.js",
                    "~/Scripts/ngStorage.js",
                    "~/Scripts/angular-load.js",
                    "~/Scripts/clipboard.js",
                    "~/Scripts/ngclipboard.js"
                )
                .Include(
                    "~/app/app.js",
                    "~/app/shared/http-interceptor.js",
                    "~/app/shared/load-resources.js",
                    "~/app/shared/state-transition.js",
                    "~/app/shared/storage-service.js",
                    "~/app/shared/*.js",
                    "~/app/filters/*.js"
                )
                .Include(
                    "~/app/directives/msrc-link.js",
                    "~/app/directives/msrc-cvss.js",
                    "~/app/directives/msrc-datepicker.js",
                    "~/app/directives/msrc-loading-spinner.js",
                    "~/app/directives/msrc-multiselect.js"
                )
                .Include(
                    "~/app/locale/*.js",
                    "~/app/authenticate/*.js"
                )
                .Include(
                    "~/app/landing/*.js",
                    "~/app/home/*.js",
                    "~/app/policy/*.js",
                    "~/app/exceptionrequest/*.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/technetjs")
                .Include("~/Scripts/Combined_technet.js"));
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
