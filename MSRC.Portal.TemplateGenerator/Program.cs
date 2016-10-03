using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace HeaderTemplateGenerator
{
    class Program
    {
        /// <summary>
        /// base url to fetch the html fragments
        /// </summary>
        private static string baseUrl = "https://technet.microsoft.com/{0}/security/bulletins";
        /// <summary>
        /// Currently supporteed locales        /// 
        /// </summary>
        private static string[] locales = { "de-de", "en-us", "en-gb", "fr-fr", "ko-kr", "ja-jp", "pt-br", "zh-cn", "zh-tw" };
        /// <summary>
        /// Url to fetch the search box js file
        /// </summary>
        private static string searchBoxJsTechnetUri = "https://i4.services.social.microsoft.com/search/Widgets/SearchBox.jss?boxid=HeaderSearchTextBox&btnid=HeaderSearchButton&brand=TechNet&loc={0}&watermark=TechNet&focusOnInit=false";
        /// <summary>
        /// the search box js file name
        /// </summary>
        private static string jsFileName = "searchbox";
        /// <summary>
        /// Triggered from a post-build event passing in upto 7 arguments
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {            
            // output directory under which the generated html templates for header & footer will be placed
            string outdir = args[0];
            // String/path for the auth header template
            string authReplaceTemplate = args[1];
            // string/path for the tabular navigation template
            string tabNavigationTemplate = args[2];
            // string/path for navigation template
            string footerNavigationTemplate = args[3];
            // string/path for brand logo template which displays the MS logo etc
            string brandLogoTemplate = args[4];
            // js output directory for the generated search box
            string jsOutDir = args.Length > 5 ? args[5] : outdir;
            // searchbox js output filename
            string jsOutputFileName = args.Length > 6 ? args[6] : jsFileName;
            // searchbox technet url
            string searchBoxJSUri = args.Length > 7 ? args[7] : searchBoxJsTechnetUri;

            if (File.Exists(authReplaceTemplate))
            {
                authReplaceTemplate = File.ReadAllText(Path.GetFullPath(authReplaceTemplate));
            }

            if (File.Exists(tabNavigationTemplate))
            {
                tabNavigationTemplate = File.ReadAllText(Path.GetFullPath(tabNavigationTemplate));
            }

            if (File.Exists(footerNavigationTemplate))
            {
                footerNavigationTemplate = File.ReadAllText(Path.GetFullPath(footerNavigationTemplate));
            }

            if (File.Exists(brandLogoTemplate))
            {
                brandLogoTemplate = File.ReadAllText(Path.GetFullPath(brandLogoTemplate));
            }

            DownloadPage(outdir, authReplaceTemplate, tabNavigationTemplate, footerNavigationTemplate, brandLogoTemplate);
            DownloadJs(jsOutDir, searchBoxJSUri, jsOutputFileName);
        }

        /// <summary>
        /// Downloads the technet searchbox js file for each locale and creates a new locale specific searchbox.js files
        /// </summary>
        /// <param name="path"></param>
        /// <param name="jsUri"></param>
        /// <param name="jsOutputFileName"></param>
        private static void DownloadJs(string path, string jsUri, string jsOutputFileName)
        {
            foreach (var locale in locales)
            {
                string url = string.Format(jsUri, locale);
                WebClient client = new WebClient();
                client.Encoding = Encoding.UTF8;
                string downloadString = client.DownloadString(url);

                File.WriteAllText(Path.Combine(path, string.Format("{0}.{1}.js", jsOutputFileName, locale)), downloadString, Encoding.UTF8);
            }
        }

        /// <summary>
        /// Downloads the technet bulletins page for each locale, extracts the header, footer, navigation elements and creates locale specific header and footer templates. 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="authReplaceTemplate"></param>
        /// <param name="tabNavigationTemplate"></param>
        /// <param name="footerNavigationTemplate"></param>
        /// <param name="brandLogoTemplate"></param>
        private static void DownloadPage(string path, string authReplaceTemplate, string tabNavigationTemplate, string footerNavigationTemplate, string brandLogoTemplate)
        {
            foreach (var locale in locales)
            {
                string url = string.Format(baseUrl, locale);
                WebClient client = new WebClient();
                client.Encoding = Encoding.UTF8;
                string downloadString = client.DownloadString(url);

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(downloadString);

                var root = doc.DocumentNode;

                var headerEl = doc.GetElementbyId("ux-header");
                var footerEl = root.SelectSingleNode("//div[@class='FooterLinks']");

                var oldAuthFragment = headerEl.SelectSingleNode("//div[@class='controlsInternal']");
                var newAuthFragment = HtmlNode.CreateNode(authReplaceTemplate);
                oldAuthFragment.ParentNode.ReplaceChild(newAuthFragment, oldAuthFragment);

                var oldBrandlogoFragment = headerEl.SelectSingleNode("//div[@class='brandLogo']");
                var newBrandlogoFragment = HtmlNode.CreateNode(brandLogoTemplate);
                oldBrandlogoFragment.ParentNode.ReplaceChild(newBrandlogoFragment, oldBrandlogoFragment);

                var oldTabFragment = headerEl.SelectSingleNode("//div[@class='toclevel2']");
                var activehref = headerEl.SelectSingleNode("//div[@class='toclevel2']/a[@class='active']");
                activehref.Attributes.Remove("class");
                activehref.Attributes.Add("class", "normal");

                var myBulletinLink = headerEl.SelectSingleNode("//div[@class='toclevel2']/a[@href='http://mybulletins.technet.microsoft.com/']");
                if (myBulletinLink != null)
                {
                    myBulletinLink.Attributes.Remove("class");
                    myBulletinLink.Attributes.Add("class", "hide");
                }

                var newTabNavigationTemplate = "<div>" + tabNavigationTemplate + "</div>";
                var newTabFragment = HtmlNode.CreateNode(newTabNavigationTemplate);
                oldTabFragment.AppendChildren(newTabFragment.ChildNodes);
                
                var oldFooterFragment = footerEl;
                var newFooterFragment = HtmlNode.CreateNode(footerNavigationTemplate);
                oldFooterFragment.ParentNode.ReplaceChild(newFooterFragment, oldFooterFragment);

                File.WriteAllText(Path.Combine(path, string.Format("header.{0}.tpl.html", locale)), headerEl.OuterHtml, Encoding.UTF8);               
                File.WriteAllText(Path.Combine(path, string.Format("footer.{0}.tpl.html", locale)), footerEl.OuterHtml, Encoding.UTF8);
            }
        }
    }
}
