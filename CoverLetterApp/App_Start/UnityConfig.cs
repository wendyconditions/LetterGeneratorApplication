using CoverLetterApp.Interfaces;
using CoverLetterApp.Services;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace CoverLetterApp
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers
            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<ICoverLetterService, CoverLetterService>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}