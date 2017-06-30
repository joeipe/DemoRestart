using System.Web;
using System.Web.Optimization;

namespace DemoRestart
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/lib/bootstrap.js",
                      "~/Scripts/lib/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/loading-bar.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/bundles/demorestart-spa/template/style").Include(
                      //< !--CSS Global Compulsory-- >
                      "~/Content/Template/css/style.css",
                      //< !--CSS Header and Footer-- >
                      "~/Content/Template/css/headers/header-default.css",
                      "~/Content/Template/css/footers/footer-v1.css",
                      //< !--CSS Implementing Plugins-- >
                      "~/Content/Template/plugins/animate.css",
                      "~/Content/Template/plugins/line-icons/line-icons.css",
                      "~/Content/Template/plugins/font-awesome/css/font-awesome.min.css",
                      "~/Content/Template/plugins/sky-forms-pro/skyforms/css/sky-forms.css",
                      "~/Content/Template/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms.css",
                      //< !--CSS Theme-- >
                      "~/Content/Template/css/theme-colors/default.css",
                      "~/Content/Template/css/theme-skins/dark.css"));

            bundles.Add(new ScriptBundle("~/bundles/demorestart-spa/template/scripts").Include(
                //< !--JS Global Compulsory-- >
                //"~/Content/Template/plugins/jquery/jquery.js",
                "~/Content/Template/plugins/jquery/jquery-migrate.js",
                "~/Content/Template/plugins/bootstrap/js/bootstrap.js",
                //< !--JS Implementing Plugins-- >
                "~/Content/Template/plugins/back-to-top.js",
                "~/Content/Template/plugins/smoothScroll.js",
                "~/Content/Template/plugins/sky-forms-pro/skyforms/js/jquery.maskedinput.min.js",
                "~/Content/Template/sky-forms-pro/skyforms/js/jquery-ui.min.js",
                "~/Content/Template/sky-forms-pro/skyforms/js/jquery.validate.min.js",
                //< !--JS Customization-- >
                "~/Scripts/lib/Template/js/custom.js",
                //< !--JS Page Level-- >
                "~/Scripts/lib/Template/app.js",
                "~/Scripts/lib/Template/plugins/style-switcher.js",
                "~/Scripts/lib/Template/plugins/masking.js",
                "~/Scripts/lib/Template/plugins/datepicker.js",
                "~/Scripts/lib/Template/plugins/validation.js",
                "~/Scripts/lib/Template/plugins/style-switcher.js"));


            bundles.Add(new ScriptBundle("~/bundles/demorestart-spa/scripts").Include(
                      "~/Scripts/lib/angular.js",
                      "~/Scripts/lib/angular-route.js",
                      "~/Scripts/lib/loading-bar.js",
                      "~/Scripts/lib/ng-file-upload-shim.js",
                      "~/Scripts/lib/ng-file-upload.js",
                      "~/Scripts/app/DemoRestartApp.js",
                      "~/Scripts/app/DataService.js",
                      "~/Scripts/app/StateForm/sfIndexController.js",
                      "~/Scripts/app/StateForm/sfTemplateController.js",
                      "~/Scripts/app/CategoryForm/cfIndexController.js",
                      "~/Scripts/app/CategoryForm/cfTemplateController.js"
                      ));

            BundleTable.EnableOptimizations = false;
        }
    }
}
